import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

type Message = { role: 'user' | 'assistant'; text: string };

const ROUTES: Record<string, number> = {
  'москва питер': 710, 'москва санкт-петербург': 710, 'питер москва': 710,
  'москва краснодар': 1360, 'краснодар москва': 1360,
  'москва екатеринбург': 1780, 'екатеринбург москва': 1780,
  'москва новосибирск': 3360, 'новосибирск москва': 3360,
  'москва казань': 820, 'казань москва': 820,
  'москва воронеж': 520, 'воронеж москва': 520,
  'москва ростов': 1230, 'ростов москва': 1230,
  'казань екатеринбург': 980, 'екатеринбург казань': 980,
  'краснодар ростов': 275, 'ростов краснодар': 275,
  'новосибирск омск': 650, 'омск новосибирск': 650,
  'уфа самара': 460, 'самара уфа': 460,
  'москва нижний новгород': 410, 'нижний новгород москва': 410,
};

const BODY_RATES: Record<string, [number, number]> = {
  тент: [80, 110],
  реф: [120, 160],
  рефрижератор: [120, 160],
  изотерм: [95, 130],
  борт: [70, 100],
  открытый: [70, 100],
  контейнер: [85, 115],
};

// Расходы на км для расчёта себестоимости
const COST_PER_KM: Record<string, number> = {
  тент: 42, реф: 58, рефрижератор: 58, изотерм: 50,
  борт: 38, открытый: 38, контейнер: 45,
};

// Фиксированные затраты на рейс (зарплата, суточные, прочее)
const FIXED_COST = 8000;

function findTonnage(text: string): number | null {
  const m = text.match(/(\d+)\s*т(?:онн)?/i);
  return m ? parseInt(m[1]) : null;
}

function calcOwnerRate(km: number, body: string, tonnage: number | null): string {
  const [lo, hi] = BODY_RATES[body] || [80, 110];
  const costPerKm = COST_PER_KM[body] || 42;

  // Себестоимость рейса
  const fuelCost = Math.round(km * costPerKm / 1000) * 1000;
  const totalCost = fuelCost + FIXED_COST;

  // Минимальная прибыльная ставка = себестоимость + 25% маржа
  const minProfit = Math.round(totalCost * 1.25 / 500) * 500;

  // Рыночная ставка
  const mktMin = Math.max(15000, Math.round(km * lo / 1000) * 1000);
  const mktMax = Math.max(15000, Math.round(km * hi / 1000) * 1000);
  const mktRec = Math.round((mktMin + mktMax) / 2 / 500) * 500;

  // Чистая прибыль
  const profit = mktRec - totalCost;
  const margin = Math.round((profit / mktRec) * 100);

  const tonnageStr = tonnage ? `, ${tonnage}т` : '';

  return `**Расчёт для собственника (${body}${tonnageStr}, ${km} км):**\n\n📦 **Себестоимость рейса:**\n• Топливо и расходники: ~${fuelCost.toLocaleString('ru')} ₽\n• Зарплата, суточные: ~${FIXED_COST.toLocaleString('ru')} ₽\n• Итого затрат: **${totalCost.toLocaleString('ru')} ₽**\n\n📊 **Рыночная ставка:**\n• Диапазон: ${mktMin.toLocaleString('ru')} – ${mktMax.toLocaleString('ru')} ₽\n• Рекомендую брать: **${mktRec.toLocaleString('ru')} ₽**\n\n💰 **Ваша прибыль:**\n• Чистыми: ~${profit.toLocaleString('ru')} ₽ (маржа ${margin}%)\n• Минимум «в ноль»+25%: ${minProfit.toLocaleString('ru')} ₽\n\n⚠️ Ниже ${minProfit.toLocaleString('ru')} ₽ — работа в убыток!`;
}

const QUICK = [
  'Москва → Питер, тент 20т, туда и обратно',
  'Рассчитай прибыль: Москва → Казань, тент 20т',
  'Что выгоднее везти из Москвы?',
  'Как торговаться с грузоотправителем?',
];

function findDistance(text: string): number | null {
  const t = text.toLowerCase();
  for (const [route, km] of Object.entries(ROUTES)) {
    const parts = route.split(' ');
    if (parts.every((p) => t.includes(p))) return km;
  }
  const match = t.match(/(\d+)\s*км/);
  if (match) return parseInt(match[1]);
  return null;
}

function findBody(text: string): string | null {
  const t = text.toLowerCase();
  for (const key of Object.keys(BODY_RATES)) {
    if (t.includes(key)) return key;
  }
  return null;
}

function calcRate(km: number, body: string): string {
  const [lo, hi] = BODY_RATES[body] || [80, 110];
  const min = Math.max(15000, Math.round(km * lo / 1000) * 1000);
  const max = Math.max(15000, Math.round(km * hi / 1000) * 1000);
  const rec = Math.round((min + max) / 2 / 500) * 500;
  return `**Расчёт ставки (${body}, ${km} км):**\n• Рыночный диапазон: ${min.toLocaleString('ru')} – ${max.toLocaleString('ru')} ₽\n• Рекомендую просить: **${rec.toLocaleString('ru')} ₽**\n• Ставка за км: ${lo}–${hi} руб/км\n\n💡 Срочный груз → +15–25%. Попутная загрузка → −20–30%.`;
}

function calcRoundTrip(km: number, body: string, tonnage: number | null): string {
  const [lo, hi] = BODY_RATES[body] || [80, 110];
  const costPerKm = COST_PER_KM[body] || 42;
  const tonnageStr = tonnage ? `, ${tonnage}т` : '';

  // Туда (полный)
  const costThere = Math.round(km * costPerKm / 1000) * 1000 + FIXED_COST;
  const mktThere = Math.round(((km * lo + km * hi) / 2) / 500) * 500;
  const mktThereMin = Math.max(15000, Math.round(km * lo / 1000) * 1000);
  const mktThereMax = Math.max(15000, Math.round(km * hi / 1000) * 1000);
  const profitThere = Math.max(0, mktThere - costThere);

  // Обратно (попутная загрузка −25% к ставке, −15% к расходам т.к. маршрут известен)
  const costBack = Math.round(km * costPerKm * 0.85 / 1000) * 1000 + FIXED_COST;
  const mktBackFull = mktThere;
  const mktBackDiscount = Math.round(mktBackFull * 0.75 / 500) * 500;
  const profitBack = Math.max(0, mktBackDiscount - costBack);

  // Итого за круговой рейс
  const totalCost = costThere + costBack;
  const totalRevenue = mktThere + mktBackDiscount;
  const totalProfit = totalRevenue - totalCost;
  const totalMargin = Math.round((totalProfit / totalRevenue) * 100);

  // Если ехать порожним обратно
  const emptyCost = Math.round(km * costPerKm * 0.85 / 1000) * 1000 + FIXED_COST;
  const profitEmptyBack = profitThere - emptyCost;

  return `**Расчёт туда и обратно (${body}${tonnageStr}, ${km} км):**\n\n➡️ **Туда (с грузом):**\n• Затраты: ~${costThere.toLocaleString('ru')} ₽\n• Ставка: ${mktThereMin.toLocaleString('ru')}–${mktThereMax.toLocaleString('ru')} ₽ → берём **${mktThere.toLocaleString('ru')} ₽**\n• Прибыль: **+${profitThere.toLocaleString('ru')} ₽**\n\n⬅️ **Обратно с попутным грузом** (−25% к ставке):\n• Затраты: ~${costBack.toLocaleString('ru')} ₽\n• Ставка попутная: **${mktBackDiscount.toLocaleString('ru')} ₽**\n• Прибыль: **+${profitBack.toLocaleString('ru')} ₽**\n\n🔄 **Итого за круговой рейс:**\n• Выручка: ${totalRevenue.toLocaleString('ru')} ₽\n• Затраты: ${totalCost.toLocaleString('ru')} ₽\n• Чистая прибыль: **${totalProfit.toLocaleString('ru')} ₽** (маржа ${totalMargin}%)\n\n⚠️ Если едешь обратно пустым: прибыль всего **${profitEmptyBack > 0 ? '+' : ''}${profitEmptyBack.toLocaleString('ru')} ₽** — попутный груз выгоднее на **${(totalProfit - profitEmptyBack).toLocaleString('ru')} ₽**!`;
}

function isOwnerQuery(t: string): boolean {
  return (
    t.includes('прибыл') || t.includes('заработ') || t.includes('доход') ||
    t.includes('себестоим') || t.includes('расход') || t.includes('затрат') ||
    t.includes('собственник') || t.includes('моя прибыль') || t.includes('выгодн') ||
    t.includes('чистыми') || t.includes('в карман') || t.includes('рассчитай мою')
  );
}

function getReply(text: string): string {
  const t = text.toLowerCase();
  const km = findDistance(text);
  const body = findBody(text);
  const tonnage = findTonnage(text);

  // Расчёт обратной загрузки / круговой рейс
  const isRoundTrip = t.includes('обратн') || t.includes('туда') || t.includes('круговой') || t.includes('оба конца') || t.includes('туда и обратно');
  if (isRoundTrip) {
    if (km && body) return calcRoundTrip(km, body, tonnage);
    if (km && !body) return `Маршрут — **${km} км**. Уточни тип кузова для расчёта туда и обратно:\n• Тент, Реф, Борт, Изотерм\n\nПример: «тент 20т».`;
    if (!km && body) return `Тип кузова — **${body}**. Укажи маршрут, и посчитаю прибыль с обратной загрузкой.\n\nПример: «Москва → Казань, тент 20т, обратно».`;
    return `Для расчёта с обратной загрузкой укажи маршрут и тип кузова.\n\nПример: «Москва → Екатеринбург, тент 20т, туда и обратно»`;
  }

  // Расчёт для собственника — прибыль и себестоимость
  if (isOwnerQuery(t)) {
    if (km && body) return calcOwnerRate(km, body, tonnage);
    if (km && !body) {
      return `Понял — считаю прибыль для **${km} км**. Уточни тип кузова:\n• Тент, Борт, Изотерм, Рефрижератор, Контейнер\n\nНапример: «тент 20т».`;
    }
    if (!km && body) {
      return `Тип кузова — **${body}**. Укажи маршрут или расстояние, и посчитаю твою чистую прибыль.\n\nПример: «Москва — Питер, тент 20т».`;
    }
    return `Для расчёта прибыли собственника укажи:\n• **Маршрут** — например «Москва → Екатеринбург»\n• **Тип кузова** — тент, реф, борт...\n• **Тоннаж** (необязательно) — 20т\n\nПример: «рассчитай прибыль Москва → Казань тент 20т»`;
  }

  // Обычный расчёт рыночной ставки
  if (km && body) return calcRate(km, body);

  if (km && !body) {
    return `Маршрут найден — **${km} км**. Уточни тип кузова:\n• Тент — 80–110 руб/км\n• Рефрижератор — 120–160 руб/км\n• Изотерм — 95–130 руб/км\n• Борт/открытый — 70–100 руб/км\n\nНапример: «тент 20т» или «реф».`;
  }

  if (!km && body) {
    return `Тип кузова понял — **${body}**. Укажи маршрут или расстояние, и рассчитаю точную ставку.\n\nПример: «Москва — Питер, тент».`;
  }

  if (t.includes('выгод') || t.includes('лучш') || t.includes('что везти')) {
    const route = t.includes('казань') ? 'Казань'
      : t.includes('питер') || t.includes('петербург') ? 'Санкт-Петербург'
      : t.includes('екатеринбург') ? 'Екатеринбург'
      : t.includes('краснодар') ? 'Краснодар'
      : 'этому направлению';
    return `**Топ грузов по ${route}:**\n\n🥇 Продукты питания — стабильный спрос, хороший тариф на реф\n🥈 Стройматериалы — большой объём, тент\n🥉 Промышленное оборудование — высокая ставка за тонну\n\n💡 Избегай сезонных просадок: июль–август загрузка на юге падает, Сибирь — зима сложнее по дороге.`;
  }

  if (t.includes('торговат') || t.includes('аргумент') || t.includes('переговор') || t.includes('цен')) {
    return `**Как аргументировать ставку:**\n\n1. Называй диапазон, не одну цифру — оставляй пространство\n2. Ссылайся на рынок: «биржа сейчас даёт 58–65 тыс по этому маршруту»\n3. Учитывай обратную загрузку — если пустой, смело +20%\n4. Срочность = твой козырь: +15–25% законные\n5. За постоянство — скидка 5–8%, но не больше\n\n💡 Никогда не называй цену первым — дай отправителю озвучить бюджет.`;
  }

  if (t.includes('когда') || t.includes('сезон') || t.includes('время')) {
    return `**Сезонность в грузоперевозках:**\n\n📈 **Высокий сезон (ставки +15–30%):**\n• Март–май: стройка, сельхоз\n• Сентябрь–ноябрь: урожай, подготовка к зиме\n• Декабрь: новогодний ажиотаж\n\n📉 **Низкий сезон:**\n• Январь–февраль: минимальный спрос\n• Июль–август: юг перегружен, север проседает\n\n💡 На Екатеринбург и Сибирь — лучше брать в марте–мае.`;
  }

  if (t.includes('привет') || t.includes('здравствуй') || t.includes('помог')) {
    return `Привет! Я помощник по ставкам на **ГрузПоток**.\n\nМогу помочь:\n• 📊 Рассчитать ставку по маршруту\n• 🚛 Подобрать выгодный тип груза\n• 💬 Дать совет по переговорам\n• 📅 Рассказать о сезонности\n\nПопробуй: «Москва → Питер, тент 20т» — рассчитаю за секунду!`;
  }

  return `Уточни запрос — и помогу с расчётом!\n\nЧто умею:\n• **Ставка по маршруту** — напиши «Москва → Казань, тент»\n• **Анализ груза** — «что выгоднее везти из Москвы»\n• **Переговоры** — «как торговаться с отправителем»\n• **Сезонность** — «когда лучше брать на Урал»`;
}

function renderText(text: string) {
  return text.split('\n').map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return <p key={i} className={line === '' ? 'mt-1' : ''} dangerouslySetInnerHTML={{ __html: bold }} />;
  });
}

const AiAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Привет! Я помогу найти лучшую ставку и рассчитать прибыль.\n\n🚛 **Ставка по маршруту:** «Москва → Питер, тент 20т»\n💰 **Прибыль собственника:** «рассчитай прибыль Москва → Казань, тент»\n🔄 **Туда и обратно:** «Москва → Екатеринбург, тент 20т, обратно» — покажу выгоду от попутного груза vs пустой пробег.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const reply = getReply(text);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <>
      {/* Кнопка */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-2xl transition-all hover:scale-110 hover:bg-accent group"
        aria-label="AI-помощник"
      >
        {open
          ? <Icon name="X" size={22} className="text-primary-foreground group-hover:text-accent-foreground" />
          : <Icon name="Bot" size={24} className="text-accent group-hover:text-accent-foreground" />
        }
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
            AI
          </span>
        )}
      </button>

      {/* Чат */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[360px] flex-col rounded-2xl border border-border bg-card shadow-2xl animate-fade-up overflow-hidden"
          style={{ height: '520px' }}>
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20">
              <Icon name="Bot" size={20} className="text-accent" />
            </div>
            <div>
              <div className="font-display text-sm font-bold text-primary-foreground">
                Помощник по ставкам
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse-dot" />
                <span className="text-xs text-primary-foreground/60">онлайн</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed space-y-0.5 ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-secondary text-foreground rounded-bl-sm'
                  }`}
                >
                  {renderText(m.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-pulse-dot"
                        style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick */}
          {messages.length <= 1 && (
            <div className="border-t border-border px-3 py-2 flex gap-1.5 overflow-x-auto">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  {q.length > 28 ? q.slice(0, 28) + '…' : q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Напиши маршрут или вопрос..."
                className="flex-1 rounded-xl border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!input.trim() || loading}
                className="rounded-xl bg-accent px-3 text-accent-foreground hover:bg-accent/90"
              >
                <Icon name="Send" size={16} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;