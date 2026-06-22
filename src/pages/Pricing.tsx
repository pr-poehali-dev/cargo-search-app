import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AiAssistant from '@/components/AiAssistant';

const plans = [
  {
    id: 'free',
    name: 'Старт',
    price: { month: 0, year: 0 },
    description: 'Для знакомства с платформой',
    badge: null,
    color: 'border-border',
    headerBg: 'bg-secondary',
    headerText: 'text-primary',
    cta: 'Начать бесплатно',
    ctaClass: 'border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground',
    features: [
      { text: 'Просмотр до 10 грузов в день', included: true },
      { text: 'Поиск по маршруту и типу груза', included: true },
      { text: 'Просмотр карточки груза', included: true },
      { text: 'AI-помощник (3 запроса/день)', included: true },
      { text: 'Отклики на грузы', included: false },
      { text: 'Чат с грузоотправителем', included: false },
      { text: 'Push-уведомления', included: false },
      { text: 'Приоритет в выдаче', included: false },
      { text: 'Аналитика и статистика', included: false },
      { text: 'Персональный менеджер', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Профи',
    price: { month: 2900, year: 24900 },
    description: 'Для активных перевозчиков',
    badge: 'Популярный',
    color: 'border-accent ring-2 ring-accent/30',
    headerBg: 'bg-primary',
    headerText: 'text-primary-foreground',
    cta: 'Попробовать 7 дней бесплатно',
    ctaClass: 'bg-accent text-accent-foreground hover:bg-accent/90',
    features: [
      { text: 'Неограниченный просмотр грузов', included: true },
      { text: 'Поиск по всем параметрам', included: true },
      { text: 'Просмотр карточки груза', included: true },
      { text: 'AI-помощник (неограниченно)', included: true },
      { text: 'Отклики на грузы', included: true },
      { text: 'Чат с грузоотправителем', included: true },
      { text: 'Push-уведомления', included: true },
      { text: 'Приоритет в выдаче', included: false },
      { text: 'Аналитика и статистика', included: false },
      { text: 'Персональный менеджер', included: false },
    ],
  },
  {
    id: 'business',
    name: 'Бизнес',
    price: { month: 7900, year: 69900 },
    description: 'Для компаний и автопарков',
    badge: 'Максимум',
    color: 'border-border',
    headerBg: 'bg-foreground',
    headerText: 'text-background',
    cta: 'Подключить тариф',
    ctaClass: 'bg-primary text-primary-foreground hover:bg-primary/90',
    features: [
      { text: 'Неограниченный просмотр грузов', included: true },
      { text: 'Поиск по всем параметрам', included: true },
      { text: 'Просмотр карточки груза', included: true },
      { text: 'AI-помощник (неограниченно)', included: true },
      { text: 'Отклики на грузы', included: true },
      { text: 'Чат с грузоотправителем', included: true },
      { text: 'Push-уведомления', included: true },
      { text: 'Приоритет в выдаче', included: true },
      { text: 'Аналитика и статистика', included: true },
      { text: 'Персональный менеджер', included: true },
    ],
  },
];

const faq = [
  {
    q: 'Можно ли отменить подписку в любой момент?',
    a: 'Да, подписку можно отменить в любое время в личном кабинете. Доступ сохраняется до конца оплаченного периода.',
  },
  {
    q: 'Как работает пробный период 7 дней?',
    a: 'После регистрации вы получаете полный доступ к тарифу Профи на 7 дней без списания средств. Карта не требуется.',
  },
  {
    q: 'Есть ли скидка при оплате за год?',
    a: 'Да — оплата за год даёт скидку около 30% по сравнению с ежемесячной оплатой.',
  },
  {
    q: 'Можно ли перейти между тарифами?',
    a: 'Конечно. Перейти на более высокий тариф можно сразу, при понижении — изменения вступят со следующего расчётного периода.',
  },
];

const Pricing = () => {
  const [billing, setBilling] = useState<'month' | 'year'>('month');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Icon name="Truck" className="text-accent" size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-wide text-primary">
              ГРУЗ<span className="text-accent">ПОТОК</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary">Грузы</Link>
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary">Кабинет</Link>
            <Link to="/pricing" className="text-sm font-medium text-primary">Тарифы</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" className="hidden text-primary sm:flex">Кабинет</Button>
            </Link>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Регистрация</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="container relative py-16 text-center md:py-20">
          <Badge className="mb-5 border-accent/30 bg-accent/15 text-accent hover:bg-accent/15">
            <Icon name="Zap" size={12} className="mr-1" />
            7 дней бесплатно на тарифе Профи
          </Badge>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight md:text-5xl animate-fade-up">
            Тарифы для перевозчиков
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/70 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Начните бесплатно — и подключите платный тариф, когда будете готовы расти
          </p>

          {/* Billing toggle */}
          <div className="mt-8 flex justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 p-1">
              <button
                onClick={() => setBilling('month')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  billing === 'month'
                    ? 'bg-primary-foreground text-primary'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                Ежемесячно
              </button>
              <button
                onClick={() => setBilling('year')}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  billing === 'year'
                    ? 'bg-primary-foreground text-primary'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                Ежегодно
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                  −30%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col overflow-hidden border-2 animate-fade-up ${plan.color}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {plan.badge && (
                <div className="absolute right-4 top-4">
                  <Badge className="bg-accent text-accent-foreground hover:bg-accent">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Plan header */}
              <div className={`${plan.headerBg} px-6 py-8`}>
                <div className={`font-display text-sm font-bold uppercase tracking-widest ${plan.headerText} opacity-70`}>
                  {plan.name}
                </div>
                <div className="mt-3 flex items-end gap-1">
                  {plan.price.month === 0 ? (
                    <span className={`font-display text-5xl font-bold ${plan.headerText}`}>
                      Бесплатно
                    </span>
                  ) : (
                    <>
                      <span className={`font-display text-5xl font-bold ${plan.headerText}`}>
                        {billing === 'year'
                          ? Math.round(plan.price.year / 12).toLocaleString('ru')
                          : plan.price.month.toLocaleString('ru')}
                      </span>
                      <span className={`mb-2 text-sm ${plan.headerText} opacity-60`}>₽/мес</span>
                    </>
                  )}
                </div>
                {plan.price.month > 0 && billing === 'year' && (
                  <div className={`mt-1 text-xs ${plan.headerText} opacity-60`}>
                    {plan.price.year.toLocaleString('ru')} ₽ при оплате за год
                  </div>
                )}
                <p className={`mt-3 text-sm ${plan.headerText} opacity-70`}>
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                {plan.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      f.included ? 'bg-accent/15' : 'bg-muted'
                    }`}>
                      <Icon
                        name={f.included ? 'Check' : 'X'}
                        size={11}
                        className={f.included ? 'text-accent' : 'text-muted-foreground'}
                      />
                    </div>
                    <span className={`text-sm ${f.included ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <Button className={`w-full ${plan.ctaClass}`}>
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-secondary/40 p-6 md:grid-cols-4">
          {[
            { icon: 'ShieldCheck', text: 'Безопасная оплата' },
            { icon: 'RefreshCw', text: 'Отмена в любой момент' },
            { icon: 'CreditCard', text: 'Карта не нужна для пробного' },
            { icon: 'Headphones', text: 'Поддержка 24/7' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2.5">
              <Icon name={item.icon} className="text-accent" size={20} />
              <span className="text-sm font-medium text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container py-16">
          <h2 className="text-center font-display text-2xl font-bold uppercase text-primary">
            Детальное сравнение тарифов
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Возможности</th>
                  {plans.map((p) => (
                    <th key={p.id} className="pb-4 text-center">
                      <div className="font-display text-base font-bold text-primary">{p.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {p.price.month === 0 ? 'Бесплатно' : `от ${p.price.month.toLocaleString('ru')} ₽/мес`}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Грузов в день', values: ['10', '∞', '∞'] },
                  { label: 'Отклики на грузы', values: ['—', '✓', '✓'] },
                  { label: 'Чат с отправителем', values: ['—', '✓', '✓'] },
                  { label: 'Push-уведомления', values: ['—', '✓', '✓'] },
                  { label: 'AI-помощник по ставкам', values: ['3/день', '∞', '∞'] },
                  { label: 'Приоритет в выдаче', values: ['—', '—', '✓'] },
                  { label: 'Аналитика рейсов', values: ['—', '—', '✓'] },
                  { label: 'Несколько водителей', values: ['—', '—', 'до 10'] },
                  { label: 'Персональный менеджер', values: ['—', '—', '✓'] },
                  { label: 'API-доступ', values: ['—', '—', '✓'] },
                ].map((row, ri) => (
                  <tr key={ri} className={`border-b border-border/50 ${ri % 2 === 0 ? '' : 'bg-secondary/30'}`}>
                    <td className="py-3.5 text-sm text-foreground">{row.label}</td>
                    {row.values.map((v, vi) => (
                      <td key={vi} className="py-3.5 text-center text-sm">
                        {v === '✓' ? (
                          <Icon name="Check" size={16} className="mx-auto text-accent" />
                        ) : v === '—' ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          <span className="font-medium text-primary">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-16">
        <h2 className="text-center font-display text-2xl font-bold uppercase text-primary">
          Частые вопросы
        </h2>
        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {faq.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-card animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium text-foreground">{item.q}</span>
                <Icon
                  name="ChevronDown"
                  size={18}
                  className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground animate-fade-up">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <Card className="relative overflow-hidden border-0 bg-primary p-10 text-center md:p-14">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold uppercase text-primary-foreground">
              Начните с бесплатного тарифа
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-foreground/70">
              Зарегистрируйтесь и попробуйте все функции Профи 7 дней без оплаты
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-accent px-10 text-accent-foreground hover:bg-accent/90">
                Попробовать бесплатно
              </Button>
              <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                Сравнить тарифы
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Icon name="Truck" className="text-accent" size={16} />
            </div>
            <span className="font-display font-bold text-primary">ГРУЗПОТОК</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 ГрузПоток — биржа грузоперевозок</p>
          <div className="flex gap-4">
            {['MessageCircle', 'Phone', 'Mail'].map((icon) => (
              <a key={icon} href="#" className="text-muted-foreground hover:text-accent">
                <Icon name={icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <AiAssistant />
    </div>
  );
};

export default Pricing;
