import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const stats = [
  { icon: 'Truck', value: '147', label: 'Перевозок', color: 'text-accent' },
  { icon: 'Wallet', value: '4.2 млн ₽', label: 'Заработано', color: 'text-accent' },
  { icon: 'Route', value: '186 тыс км', label: 'Пробег', color: 'text-accent' },
  { icon: 'Star', value: '4.9', label: 'Рейтинг', color: 'text-accent' },
];

const orders = [
  {
    id: 'ЗК-1047',
    from: 'Москва',
    to: 'Санкт-Петербург',
    type: 'Стройматериалы',
    price: '58 000 ₽',
    date: '21 июня',
    status: 'В пути',
    statusColor: 'bg-accent/15 text-accent',
    progress: 65,
  },
  {
    id: 'ЗК-1042',
    from: 'Казань',
    to: 'Екатеринбург',
    type: 'Продукты питания',
    price: '74 500 ₽',
    date: '18 июня',
    status: 'Доставлен',
    statusColor: 'bg-green-100 text-green-700',
    progress: 100,
  },
  {
    id: 'ЗК-1039',
    from: 'Новосибирск',
    to: 'Омск',
    type: 'Оборудование',
    price: '41 000 ₽',
    date: '15 июня',
    status: 'Доставлен',
    statusColor: 'bg-green-100 text-green-700',
    progress: 100,
  },
  {
    id: 'ЗК-1035',
    from: 'Краснодар',
    to: 'Ростов-на-Дону',
    type: 'Сельхозпродукция',
    price: '32 000 ₽',
    date: '12 июня',
    status: 'Отменён',
    statusColor: 'bg-destructive/10 text-destructive',
    progress: 0,
  },
];

const responses = [
  { cargo: 'Москва → Воронеж', company: 'АгроПром', status: 'Ожидает', date: 'Сегодня' },
  { cargo: 'Уфа → Самара', company: 'МеталлТорг', status: 'Принят', date: 'Вчера' },
  { cargo: 'Тула → Липецк', company: 'СтройДвор', status: 'Отклонён', date: '19 июня' },
];

const Dashboard = () => {
  const [tab, setTab] = useState<'orders' | 'responses'>('orders');

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
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Грузы
            </Link>
            <a href="#" className="text-sm font-medium text-primary">
              Кабинет
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Тарифы
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="relative text-muted-foreground hover:text-primary">
              <Icon name="Bell" size={20} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                3
              </span>
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              ИП
            </div>
          </div>
        </div>
      </header>

      {/* Profile */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="container relative py-10 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5 animate-fade-up">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-accent-foreground font-display">
                ИП
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-bold uppercase md:text-3xl">
                    Иван Петров
                  </h1>
                  <Badge className="border-accent/30 bg-accent/15 text-accent hover:bg-accent/15">
                    <Icon name="BadgeCheck" size={12} className="mr-1" />
                    Проверен
                  </Badge>
                </div>
                <p className="mt-1 text-primary-foreground/70">
                  Перевозчик · Тент 20т · Москва
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon
                      key={s}
                      name="Star"
                      size={16}
                      className={s <= 5 ? 'fill-accent text-accent' : 'text-primary-foreground/30'}
                    />
                  ))}
                  <span className="ml-2 text-sm text-primary-foreground/70">4.9 · 132 отзыва</span>
                </div>
              </div>
            </div>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 animate-fade-up">
              <Icon name="Settings" size={16} className="mr-2" />
              Редактировать профиль
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <Card
                key={s.label}
                className="animate-fade-up border-0 bg-primary-foreground/5 p-5 backdrop-blur"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <Icon name={s.icon} className={s.color} size={22} />
                <div className="mt-3 font-display text-2xl font-bold text-primary-foreground">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-primary-foreground/60">{s.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <div className="flex gap-2 rounded-lg bg-secondary p-1 w-fit">
          {[
            { id: 'orders' as const, label: 'История заказов' },
            { id: 'responses' as const, label: 'Мои отклики' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-md px-5 py-2 text-sm font-medium transition-all ${
                tab === t.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="mt-6 space-y-4">
            {orders.map((o, i) => (
              <Card
                key={o.id}
                className="hover-lift animate-fade-up border-border bg-card p-5"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                      <Icon name="Package" className="text-primary" size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg font-semibold text-primary">
                          {o.from} → {o.to}
                        </span>
                        <Badge className={`${o.statusColor} hover:${o.statusColor}`}>
                          {o.status}
                        </Badge>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {o.id} · {o.type} · {o.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-display text-xl font-bold text-primary">{o.price}</div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border">
                      Детали
                    </Button>
                  </div>
                </div>
                {o.progress > 0 && o.progress < 100 && (
                  <div className="mt-4">
                    <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                      <span>В пути</span>
                      <span>{o.progress}%</span>
                    </div>
                    <Progress value={o.progress} className="h-1.5" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {tab === 'responses' && (
          <div className="mt-6 space-y-4">
            {responses.map((r, i) => (
              <Card
                key={i}
                className="hover-lift animate-fade-up flex items-center justify-between border-border bg-card p-5"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                    <Icon name="Send" className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-display text-lg font-semibold text-primary">
                      {r.cargo}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {r.company} · {r.date}
                    </div>
                  </div>
                </div>
                <Badge
                  className={
                    r.status === 'Принят'
                      ? 'bg-green-100 text-green-700 hover:bg-green-100'
                      : r.status === 'Отклонён'
                        ? 'bg-destructive/10 text-destructive hover:bg-destructive/10'
                        : 'bg-accent/15 text-accent hover:bg-accent/15'
                  }
                >
                  {r.status}
                </Badge>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
