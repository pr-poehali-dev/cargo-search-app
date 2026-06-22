import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const cargos = [
  {
    id: 1,
    from: 'Москва',
    to: 'Санкт-Петербург',
    distance: '710 км',
    type: 'Стройматериалы',
    weight: '20 т',
    volume: '82 м³',
    price: '58 000 ₽',
    date: 'Сегодня',
    rating: 4.9,
    company: 'СтройЛогистик',
    body: 'Тент',
    hot: true,
  },
  {
    id: 2,
    from: 'Казань',
    to: 'Екатеринбург',
    distance: '980 км',
    type: 'Продукты питания',
    weight: '12 т',
    volume: '45 м³',
    price: '74 500 ₽',
    date: 'Завтра',
    rating: 4.7,
    company: 'ВолгаТранс',
    body: 'Рефрижератор',
    hot: false,
  },
  {
    id: 3,
    from: 'Новосибирск',
    to: 'Омск',
    distance: '650 км',
    type: 'Оборудование',
    weight: '8 т',
    volume: '30 м³',
    price: '41 000 ₽',
    date: 'Сегодня',
    rating: 5.0,
    company: 'СибирьКарго',
    body: 'Изотерм',
    hot: true,
  },
  {
    id: 4,
    from: 'Краснодар',
    to: 'Ростов-на-Дону',
    distance: '275 км',
    type: 'Сельхозпродукция',
    weight: '22 т',
    volume: '90 м³',
    price: '32 000 ₽',
    date: 'Завтра',
    rating: 4.8,
    company: 'ЮгАгро',
    body: 'Тент',
    hot: false,
  },
];

const stats = [
  { value: '12 480', label: 'Грузов в день' },
  { value: '8 200+', label: 'Перевозчиков' },
  { value: '4.8', label: 'Средний рейтинг' },
  { value: '63', label: 'Региона РФ' },
];

const Index = () => {
  const [cargoType, setCargoType] = useState('all');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Icon name="Truck" className="text-accent" size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-wide text-primary">
              ГРУЗ<span className="text-accent">ПОТОК</span>
            </span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            {['Грузы', 'Транспорт', 'Тарифы', 'О платформе'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="relative text-muted-foreground transition-colors hover:text-primary">
              <Icon name="Bell" size={20} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                3
              </span>
            </button>
            <Link to="/dashboard">
              <Button variant="ghost" className="hidden text-primary sm:flex">
                Кабинет
              </Button>
            </Link>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Регистрация
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-3xl animate-fade-up">
            <Badge className="mb-5 border-accent/30 bg-accent/15 text-accent hover:bg-accent/20">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              12 480 активных заявок прямо сейчас
            </Badge>
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-6xl">
              Грузы и транспорт
              <br />
              <span className="text-accent">находят друг друга</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/70">
              B2B-платформа для грузоперевозок. Поиск грузов по маршруту, проверенные
              перевозчики, рейтинги и сделки онлайн.
            </p>
          </div>

          {/* Search bar */}
          <Card
            className="mt-10 animate-fade-up border-0 bg-card p-2 shadow-2xl"
            style={{ animationDelay: '0.15s' }}
          >
            <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
                <Icon name="MapPin" className="text-accent" size={18} />
                <Input
                  placeholder="Откуда"
                  className="border-0 bg-transparent p-0 text-foreground shadow-none focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
                <Icon name="Navigation" className="text-accent" size={18} />
                <Input
                  placeholder="Куда"
                  className="border-0 bg-transparent p-0 text-foreground shadow-none focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
                <Icon name="Package" className="text-accent" size={18} />
                <Input
                  placeholder="Тип груза"
                  className="border-0 bg-transparent p-0 text-foreground shadow-none focus-visible:ring-0"
                />
              </div>
              <Button
                size="lg"
                className="h-auto bg-accent px-8 text-accent-foreground hover:bg-accent/90"
              >
                <Icon name="Search" size={18} className="mr-2" />
                Найти
              </Button>
            </div>
          </Card>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="animate-fade-up border-l-2 border-accent/40 pl-4"
                style={{ animationDelay: `${0.25 + i * 0.08}s` }}
              >
                <div className="font-display text-3xl font-bold text-accent">{s.value}</div>
                <div className="mt-1 text-sm text-primary-foreground/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cargo list */}
      <section className="container py-16">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase text-primary">
              Свежие грузы
            </h2>
            <p className="mt-2 text-muted-foreground">
              Актуальные заявки от проверенных грузоотправителей
            </p>
          </div>
          <div className="flex gap-2 rounded-lg bg-secondary p-1">
            {[
              { id: 'all', label: 'Все' },
              { id: 'hot', label: 'Срочные' },
              { id: 'near', label: 'Рядом' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCargoType(tab.id)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
                  cargoType === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {cargos
            .filter((c) => (cargoType === 'hot' ? c.hot : true))
            .map((cargo, i) => (
              <Card
                key={cargo.id}
                className="hover-lift group animate-fade-up cursor-pointer border-border bg-card p-6"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {cargo.hot && (
                      <Badge className="bg-accent/15 text-accent hover:bg-accent/15">
                        <Icon name="Flame" size={12} className="mr-1" />
                        Срочно
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      {cargo.body}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold text-primary">
                      {cargo.price}
                    </div>
                    <div className="text-xs text-muted-foreground">{cargo.date}</div>
                  </div>
                </div>

                {/* Route */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                    <div className="my-1 h-8 w-px bg-border" />
                    <div className="h-2.5 w-2.5 rounded-full border-2 border-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-lg font-semibold text-primary">
                      {cargo.from}
                    </div>
                    <div className="mt-3.5 font-display text-lg font-semibold text-primary">
                      {cargo.to}
                    </div>
                  </div>
                  <div className="self-center rounded-lg bg-secondary px-3 py-1.5 text-center">
                    <div className="font-display text-sm font-bold text-primary">
                      {cargo.distance}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Груз</div>
                    <div className="text-sm font-medium text-primary">{cargo.type}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Вес</div>
                    <div className="text-sm font-medium text-primary">{cargo.weight}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Объём</div>
                    <div className="text-sm font-medium text-primary">{cargo.volume}</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {cargo.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary">{cargo.company}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Star" size={11} className="fill-accent text-accent" />
                        {cargo.rating}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground transition-all group-hover:bg-accent group-hover:text-accent-foreground"
                  >
                    Откликнуться
                    <Icon name="ArrowRight" size={14} className="ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container py-16">
          <h2 className="text-center font-display text-3xl font-bold uppercase text-primary">
            Всё для работы перевозчика
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: 'Search', title: 'Умный поиск', desc: 'Фильтры по маршруту, типу кузова, весу и срокам' },
              { icon: 'MessageSquare', title: 'Чат и сделки', desc: 'Переговоры и согласование условий прямо в платформе' },
              { icon: 'BellRing', title: 'Push-уведомления', desc: 'Мгновенные оповещения о новых грузах на маршруте' },
              { icon: 'ShieldCheck', title: 'Рейтинги', desc: 'Проверенные компании и история сделок' },
            ].map((f, i) => (
              <Card
                key={f.title}
                className="hover-lift animate-fade-up border-border bg-card p-6"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                  <Icon name={f.icon} className="text-accent" size={24} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <Card className="relative overflow-hidden border-0 bg-primary p-10 text-center md:p-16">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold uppercase text-primary-foreground md:text-4xl">
              Начните возить уже сегодня
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-foreground/70">
              Зарегистрируйтесь за 2 минуты и получите доступ к тысячам грузов по всей России
            </p>
            <Button
              size="lg"
              className="mt-8 bg-accent px-10 text-accent-foreground hover:bg-accent/90"
            >
              Создать аккаунт бесплатно
            </Button>
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
          <p className="text-sm text-muted-foreground">
            © 2026 ГрузПоток — биржа грузоперевозок
          </p>
          <div className="flex gap-4">
            {['MessageCircle', 'Phone', 'Mail'].map((icon) => (
              <a key={icon} href="#" className="text-muted-foreground hover:text-accent">
                <Icon name={icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;