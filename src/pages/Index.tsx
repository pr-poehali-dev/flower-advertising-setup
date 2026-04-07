import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/b0476b73-9102-49b7-ab34-9b3eca4e52a4/files/505ebc88-976e-4670-b493-293b45a39de8.jpg";
const SHIELD_IMG = "https://cdn.poehali.dev/projects/b0476b73-9102-49b7-ab34-9b3eca4e52a4/files/ef244f22-3376-4978-8e19-79ba08b33c39.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{val.toLocaleString("ru")}{suffix}</span>;
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`section-enter ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

const months = [
  {
    num: "01", label: "МЕСЯЦ", title: "Запуск и тест",
    color: "lime",
    tasks: [
      "Глубокий анализ конкурентов и ниши",
      "Сбор семантики 500+ ключевых запросов",
      "Настройка аналитики и колл-трекинга",
      "Запуск тестовых кампаний по 5 группам",
      "A/B тест объявлений и посадочных страниц",
    ],
    metric: "Цель: первые лиды, сбор данных",
    kpi: [
      { label: "CTR", value: "4–6%" },
      { label: "Заказы", value: "40–60" },
      { label: "CPL", value: "≤ 800₽" },
    ],
  },
  {
    num: "02", label: "МЕСЯЦ", title: "Оптимизация",
    color: "cyan",
    tasks: [
      "Отключение неэффективных ключей",
      "Масштабирование конвертирующих групп",
      "Подключение ретаргетинга и look-alike",
      "Оптимизация ставок по ROAS",
      "Расширение на новые сегменты аудитории",
    ],
    metric: "Цель: снижение CPL на 30%",
    kpi: [
      { label: "CTR", value: "6–9%" },
      { label: "Заказы", value: "70–100" },
      { label: "CPL", value: "≤ 600₽" },
    ],
  },
  {
    num: "03", label: "МЕСЯЦ", title: "Масштаб и ROI",
    color: "lime",
    tasks: [
      "Выход на целевой ROI 150%+",
      "Автоматические стратегии управления ставками",
      "Кросс-канальная синергия (РСЯ + Поиск)",
      "Запуск медийной рекламы для Brand Awareness",
      "Формирование системы постоянного роста",
    ],
    metric: "Цель: стабильная прибыльность",
    kpi: [
      { label: "CTR", value: "8–12%" },
      { label: "Заказы", value: "100–130" },
      { label: "CPL", value: "≤ 480₽" },
    ],
  },
];

const keywords = [
  { query: "доставка цветов челябинск", volume: 8100, cpc: 42, intent: "горячий" },
  { query: "купить букет цветов челябинск", volume: 5400, cpc: 38, intent: "горячий" },
  { query: "цветы с доставкой на дом челябинск", volume: 3900, cpc: 35, intent: "горячий" },
  { query: "заказать цветы челябинск", volume: 4700, cpc: 40, intent: "горячий" },
  { query: "недорогие цветы челябинск", volume: 2200, cpc: 22, intent: "тёплый" },
  { query: "цветочный магазин челябинск", volume: 6300, cpc: 18, intent: "холодный" },
];

const weekTasks = [
  { day: "Пн", task: "Аудит статистики за неделю", icon: "BarChart3" },
  { day: "Вт", task: "Минусация нерелевантных запросов", icon: "Filter" },
  { day: "Ср", task: "Корректировка ставок по сегментам", icon: "TrendingUp" },
  { day: "Чт", task: "Анализ объявлений и CTR", icon: "Eye" },
  { day: "Пт", task: "Отчёт + план на следующую неделю", icon: "FileText" },
];

const dailyTasks = [
  { time: "09:00", task: "Проверка расхода бюджета", icon: "DollarSign" },
  { time: "11:00", task: "Мониторинг позиций и кликов", icon: "Activity" },
  { time: "14:00", task: "Контроль конверсий", icon: "Target" },
  { time: "17:00", task: "Блокировка мусорного трафика", icon: "Shield" },
];

const strategies = [
  {
    icon: "Zap",
    title: "Умное распределение бюджета",
    desc: "80% на горячие запросы с высоким Intent, 20% на тест новых гипотез. Ежедневный контроль расхода.",
    saving: "−35% к CPL",
  },
  {
    icon: "Target",
    title: "Гиперсегментация аудиторий",
    desc: "Разделяем трафик по устройствам, времени, гео и поведению. Разные объявления для каждого сегмента.",
    saving: "×2.4 конверсия",
  },
  {
    icon: "TrendingDown",
    title: "Минус-слова и чистка трафика",
    desc: "База из 3000+ минус-слов. Еженедельный аудит поисковых запросов. Блокировка фродового трафика.",
    saving: "−28% слива",
  },
  {
    icon: "RefreshCw",
    title: "Ротация объявлений",
    desc: "Постоянный A/B тест заголовков, описаний, расширений. Автоотключение проигравших вариантов.",
    saving: "+40% CTR",
  },
];


const risks = [
  {
    icon: "AlertTriangle",
    risk: "Скликивание бюджета ботами",
    solution: "Антифрод-система + IP-блокировки + мониторинг аномалий CTR в реальном времени",
    color: "lime",
  },
  {
    icon: "Ban",
    risk: "Нецелевой трафик",
    solution: "3000+ минус-слов, гео-таргетинг, блокировка площадок РСЯ с плохими показателями",
    color: "cyan",
  },
  {
    icon: "TrendingDown",
    risk: "Рост стоимости клика",
    solution: "Диверсификация по каналам, работа с long-tail запросами, собственные аудитории",
    color: "lime",
  },
  {
    icon: "Clock",
    risk: "Перерасход суточного бюджета",
    solution: "Автоматические правила в Директе + ежедневный мониторинг в 09:00, 14:00, 17:00",
    color: "cyan",
  },
];

export default function Index() {
  const [budget, setBudget] = useState(40000);
  const [convRate, setConvRate] = useState(3);
  const [avgCheck, setAvgCheck] = useState(3000);
  const [margin, setMargin] = useState(40);
  const [activeMonth, setActiveMonth] = useState(0);

  const clicks = Math.round(budget / 65);
  const leads = Math.round(clicks * (convRate / 100));
  const revenue = leads * avgCheck;
  const profit = revenue * (margin / 100) - budget;
  const roi = budget > 0 ? Math.round((profit / budget) * 100) : 0;
  const cpl = leads > 0 ? Math.round(budget / leads) : 0;

  return (
    <div className="min-h-screen bg-navy relative overflow-x-hidden">
      <div className="fixed inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(170,255,0,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 100% 80%, rgba(0,245,255,0.06) 0%, transparent 50%)"
      }} />

      {/* NAV */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-navy" />
            </div>
            <span className="font-oswald text-lg font-semibold tracking-wide">КОНТЕКСТ PRO</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60 font-golos">
            <a href="#plan" className="hover:text-lime transition-colors">План</a>
            <a href="#keywords" className="hover:text-lime transition-colors">Запросы</a>
            <a href="#tasks" className="hover:text-lime transition-colors">Задачи</a>
            <a href="#roi" className="hover:text-lime transition-colors">ROI</a>
            <a href="#protection" className="hover:text-lime transition-colors">Защита</a>
          </div>
          <button className="bg-lime text-navy text-sm font-golos font-semibold px-5 py-2 rounded-lg hover:brightness-110 transition-all glow-lime">
            Обсудить проект
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-lime rounded-full px-4 py-2 text-lime text-sm font-golos font-medium mb-6">
              <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
              Коммерческое предложение 2026
            </div>
            <h1 className="font-oswald text-5xl lg:text-7xl font-bold leading-none mb-6 uppercase">
              Контекстная<br />
              <span className="text-lime text-glow-lime">реклама</span><br />
              которая <span className="text-cyan text-glow-cyan">работает</span>
            </h1>
            <p className="text-white/60 text-lg font-golos leading-relaxed mb-8">
              Стратегия на 3 месяца: от первых лидов до стабильной рентабельности.
              С защитой бюджетов, ROI-калькулятором и прозрачной отчётностью.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-lime text-navy font-oswald font-semibold text-lg px-8 py-4 rounded-xl hover:brightness-110 transition-all glow-lime">
                НАЧАТЬ РАБОТУ
              </button>
              <button className="glass border border-white/20 text-white font-golos px-8 py-4 rounded-xl hover:border-lime/50 transition-all">
                Посмотреть план →
              </button>
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
            <div className="relative rounded-2xl overflow-hidden glow-lime animate-float">
              <img src={HERO_IMG} alt="Dashboard" className="w-full rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
            <div className="absolute -left-6 top-1/4 glass-lime rounded-xl p-4 animate-float-delay">
              <div className="text-lime font-oswald text-2xl font-bold">ROI 280%</div>
              <div className="text-white/60 text-xs font-golos">3 месяц</div>
            </div>
            <div className="absolute -right-4 bottom-1/4 glass-cyan rounded-xl p-4 animate-float">
              <div className="text-cyan font-oswald text-2xl font-bold">-42% CPL</div>
              <div className="text-white/60 text-xs font-golos">оптимизация</div>
            </div>
          </div>
        </div>

        <Section className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Ключевых запросов", value: 300, suffix: "+" },
            { label: "Целевой CPL", value: 480, suffix: "₽" },
            { label: "Прогноз заказов / мес", value: 120, suffix: "+" },
            { label: "Целевой ROI", value: 160, suffix: "%" },
          ].map((m) => (
            <div key={m.label} className="glass rounded-2xl p-6 text-center hover:border-lime/30 transition-all border border-white/5">
              <div className="font-oswald text-4xl font-bold text-lime text-glow-lime">
                <AnimatedNumber target={m.value} suffix={m.suffix} />
              </div>
              <div className="text-white/50 text-sm font-golos mt-2">{m.label}</div>
            </div>
          ))}
        </Section>
      </section>

      {/* PLAN */}
      <section id="plan" className="max-w-6xl mx-auto px-6 py-20">
        <Section>
          <div className="text-center mb-12">
            <div className="text-lime font-golos text-sm uppercase tracking-widest mb-3">Дорожная карта</div>
            <h2 className="font-oswald text-5xl font-bold uppercase">ПЛАН НА 3 МЕСЯЦА</h2>
          </div>
        </Section>

        <Section className="flex gap-2 mb-8 glass rounded-2xl p-2">
          {months.map((m, i) => (
            <button
              key={i}
              onClick={() => setActiveMonth(i)}
              className={`flex-1 py-3 px-4 rounded-xl font-oswald font-semibold text-sm uppercase transition-all ${
                activeMonth === i
                  ? m.color === "lime"
                    ? "bg-lime text-navy glow-lime"
                    : "bg-cyan text-navy glow-cyan"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {m.num} {m.label}
            </button>
          ))}
        </Section>

        {months.map((m, i) => (
          <div key={i} className={activeMonth !== i ? "hidden" : ""}>
            <Section>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass rounded-2xl p-8">
                  <h3 className={`font-oswald text-3xl font-bold mb-6 ${m.color === "lime" ? "text-lime" : "text-cyan"}`}>
                    {m.title}
                  </h3>
                  <ul className="space-y-3">
                    {m.tasks.map((t, ti) => (
                      <li key={ti} className="flex items-start gap-3 font-golos text-white/80">
                        <span className={`mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${m.color === "lime" ? "bg-lime text-navy" : "bg-cyan text-navy"}`}>
                          {ti + 1}
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-6 glass rounded-xl p-4 border ${m.color === "lime" ? "border-lime/20" : "border-cyan/20"}`}>
                    <span className={`font-golos text-sm font-semibold ${m.color === "lime" ? "text-lime" : "text-cyan"}`}>
                      🎯 {m.metric}
                    </span>
                  </div>
                </div>
                <div className="glass rounded-2xl p-8">
                  <div className="text-white/50 font-golos text-sm uppercase tracking-widest mb-6">KPI месяца</div>
                  {m.kpi.map((k, ki) => (
                    <div key={ki} className="mb-6 last:mb-0">
                      <div className="flex justify-between font-golos text-sm mb-2">
                        <span className="text-white/60">{k.label}</span>
                        <span className={`font-bold ${m.color === "lime" ? "text-lime" : "text-cyan"}`}>{k.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className={`h-2 rounded-full ${m.color === "lime" ? "bg-lime" : "bg-cyan"}`}
                          style={{ width: `${[60, 75, 90][i]}%`, transition: "width 1s ease" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        ))}
      </section>

      {/* KEYWORDS */}
      <section id="keywords" className="border-y border-white/5 py-20" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <div className="text-cyan font-golos text-sm uppercase tracking-widest mb-3">Семантика</div>
              <h2 className="font-oswald text-5xl font-bold uppercase">КЛЮЧЕВЫЕ ЗАПРОСЫ</h2>
              <p className="text-white/50 font-golos mt-4">Прогноз по базовой семантике (пример для ниши)</p>
            </div>
          </Section>
          <Section>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="grid grid-cols-4 px-6 py-4 border-b border-white/10">
                {["Запрос", "Частотность / мес", "Ставка (₽)", "Тип"].map((h) => (
                  <div key={h} className="text-white/40 text-xs font-golos uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {keywords.map((kw, i) => (
                <div key={i} className="grid grid-cols-4 px-6 py-4 border-b border-white/5 hover:bg-white/3 transition-colors group">
                  <div className="font-golos text-white/90 text-sm group-hover:text-lime transition-colors">{kw.query}</div>
                  <div className="font-oswald text-lg font-semibold text-white">{kw.volume.toLocaleString("ru")}</div>
                  <div className="font-golos text-white/70">{kw.cpc}₽</div>
                  <div>
                    <span className={`text-xs font-golos font-semibold px-3 py-1 rounded-full ${
                      kw.intent === "горячий"
                        ? "bg-lime/15 text-lime border border-lime/30"
                        : kw.intent === "тёплый"
                        ? "bg-cyan/15 text-cyan border border-cyan/30"
                        : "bg-white/5 text-white/50 border border-white/10"
                    }`}>
                      {kw.intent}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Горячих запросов", value: "38%", icon: "Flame", desc: "Высокая конверсия" },
              { label: "Тёплых запросов", value: "44%", icon: "TrendingUp", desc: "Работа с воронкой" },
              { label: "Информационных", value: "18%", icon: "Info", desc: "Brand Awareness" },
            ].map((s) => (
              <div key={s.label} className="glass-lime rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-lime/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={s.icon as string} size={22} className="text-lime" />
                </div>
                <div>
                  <div className="font-oswald text-2xl font-bold text-lime">{s.value}</div>
                  <div className="font-golos text-white/70 text-sm">{s.label}</div>
                  <div className="font-golos text-white/40 text-xs">{s.desc}</div>
                </div>
              </div>
            ))}
          </Section>
        </div>
      </section>

      {/* TASKS */}
      <section id="tasks" className="max-w-6xl mx-auto px-6 py-20">
        <Section>
          <div className="text-center mb-12">
            <div className="text-lime font-golos text-sm uppercase tracking-widest mb-3">Операционный ритм</div>
            <h2 className="font-oswald text-5xl font-bold uppercase">ЗАДАЧИ ПО ДНЯМ</h2>
          </div>
        </Section>
        <div className="grid lg:grid-cols-2 gap-8">
          <Section>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-oswald text-2xl font-bold text-cyan mb-6 flex items-center gap-3">
                <Icon name="Calendar" size={22} className="text-cyan" />
                ЕЖЕНЕДЕЛЬНО
              </h3>
              <div className="space-y-3">
                {weekTasks.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 glass rounded-xl p-4 hover:border-cyan/30 transition-all border border-transparent">
                    <div className="w-10 h-10 bg-cyan/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={t.icon as string} size={18} className="text-cyan" />
                    </div>
                    <div>
                      <div className="text-cyan font-oswald font-semibold text-sm uppercase">{t.day}</div>
                      <div className="text-white/80 font-golos text-sm">{t.task}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          <Section>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-oswald text-2xl font-bold text-lime mb-6 flex items-center gap-3">
                <Icon name="Clock" size={22} className="text-lime" />
                ЕЖЕДНЕВНО
              </h3>
              <div className="space-y-3">
                {dailyTasks.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 glass rounded-xl p-4 hover:border-lime/30 transition-all border border-transparent">
                    <div className="text-lime font-oswald font-bold text-sm w-14 flex-shrink-0">{t.time}</div>
                    <div className="w-10 h-10 bg-lime/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={t.icon as string} size={18} className="text-lime" />
                    </div>
                    <div className="text-white/80 font-golos text-sm">{t.task}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 glass-lime rounded-xl p-4">
                <div className="text-white/60 font-golos text-sm">
                  📊 Ежемесячный отчёт: P&L, воронка, прогноз на следующий месяц
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section id="roi" className="border-y border-white/5 py-20" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <div className="text-lime font-golos text-sm uppercase tracking-widest mb-3">Интерактивный расчёт</div>
              <h2 className="font-oswald text-5xl font-bold uppercase">КАЛЬКУЛЯТОР ROI</h2>
              <p className="text-white/50 font-golos mt-4">Двигайте ползунки — результат пересчитывается в реальном времени</p>
            </div>
          </Section>
          <Section>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="glass rounded-2xl p-8 space-y-8">
                {[
                  { label: "Рекламный бюджет", value: budget, min: 10000, max: 100000, step: 5000, onChange: setBudget, format: (v: number) => `${v.toLocaleString("ru")} ₽` },
                  { label: "Конверсия сайта (%)", value: convRate, min: 1, max: 15, step: 0.5, onChange: setConvRate, format: (v: number) => `${v}%` },
                  { label: "Средний чек", value: avgCheck, min: 500, max: 15000, step: 500, onChange: setAvgCheck, format: (v: number) => `${v.toLocaleString("ru")} ₽` },
                  { label: "Маржинальность (%)", value: margin, min: 10, max: 80, step: 5, onChange: setMargin, format: (v: number) => `${v}%` },
                ].map((sl) => (
                  <div key={sl.label}>
                    <div className="flex justify-between font-golos mb-3">
                      <span className="text-white/70 text-sm">{sl.label}</span>
                      <span className="text-lime font-semibold">{sl.format(sl.value)}</span>
                    </div>
                    <input
                      type="range"
                      min={sl.min}
                      max={sl.max}
                      step={sl.step}
                      value={sl.value}
                      onChange={(e) => sl.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="gradient-border rounded-2xl p-8 text-center">
                  <div className="text-white/50 font-golos text-sm mb-2">ROI рекламы</div>
                  <div className={`font-oswald text-7xl font-bold ${roi >= 0 ? "text-lime text-glow-lime" : "text-red-400"}`}>
                    {roi}%
                  </div>
                  <div className={`font-golos mt-2 text-sm ${roi >= 100 ? "text-lime" : roi >= 0 ? "text-white/60" : "text-red-400"}`}>
                    {roi >= 200 ? "Отличный результат!" : roi >= 100 ? "Прибыльно" : roi >= 0 ? "На уровне окупаемости" : "Убыточно — снизьте бюджет"}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Кликов в месяц", value: clicks.toLocaleString("ru"), icon: "MousePointer", color: "cyan" },
                    { label: "Лидов в месяц", value: leads.toLocaleString("ru"), icon: "Users", color: "lime" },
                    { label: "Стоимость лида", value: `${cpl.toLocaleString("ru")} ₽`, icon: "Tag", color: "cyan" },
                    { label: "Прибыль", value: `${profit > 0 ? "+" : ""}${(profit / 1000).toFixed(0)}K ₽`, icon: "TrendingUp", color: profit >= 0 ? "lime" : "red" },
                  ].map((r) => (
                    <div key={r.label} className={`glass rounded-xl p-4 border ${r.color === "lime" ? "border-lime/15" : r.color === "cyan" ? "border-cyan/15" : "border-red-500/15"}`}>
                      <Icon name={r.icon as string} size={18} className={`mb-2 ${r.color === "lime" ? "text-lime" : r.color === "cyan" ? "text-cyan" : "text-red-400"}`} />
                      <div className={`font-oswald text-xl font-bold ${r.color === "lime" ? "text-lime" : r.color === "cyan" ? "text-cyan" : "text-red-400"}`}>{r.value}</div>
                      <div className="text-white/50 text-xs font-golos mt-1">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* STRATEGIES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Section>
          <div className="text-center mb-12">
            <div className="text-cyan font-golos text-sm uppercase tracking-widest mb-3">Методология</div>
            <h2 className="font-oswald text-5xl font-bold uppercase">СНИЖЕНИЕ СТОИМОСТИ ЛИДА</h2>
          </div>
        </Section>
        <Section className="grid md:grid-cols-2 gap-6">
          {strategies.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-8 hover:border-lime/20 transition-all border border-white/5 group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-lime/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-lime/20 transition-all">
                  <Icon name={s.icon as string} size={26} className="text-lime" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-oswald text-xl font-semibold">{s.title}</h3>
                    <span className="text-lime font-oswald font-bold text-lg">{s.saving}</span>
                  </div>
                  <p className="text-white/60 font-golos text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </Section>
      </section>

      {/* PROTECTION */}
      <section id="protection" className="border-y border-white/5 py-20" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <div className="text-lime font-golos text-sm uppercase tracking-widest mb-3">Безопасность бюджетов</div>
                <h2 className="font-oswald text-5xl font-bold uppercase">ЗАЩИТА ОТ<br /><span className="text-lime">СЛИВА</span></h2>
                <p className="text-white/60 font-golos mt-4 leading-relaxed">
                  Комплексная система защиты рекламного бюджета от фрода,
                  нецелевого трафика и технических ошибок.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden glow-cyan animate-float-delay">
                <img src={SHIELD_IMG} alt="Protection" className="w-full rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-oswald text-2xl font-bold text-cyan">−42% потерь бюджета</div>
                  <div className="text-white/60 font-golos text-sm">за счёт комплексной защиты</div>
                </div>
              </div>
            </div>
          </Section>
          <Section className="grid md:grid-cols-2 gap-4">
            {risks.map((r, i) => (
              <div key={i} className={`glass rounded-2xl p-6 border ${r.color === "lime" ? "border-lime/15 hover:border-lime/30" : "border-cyan/15 hover:border-cyan/30"} transition-all`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${r.color === "lime" ? "bg-lime/15" : "bg-cyan/15"}`}>
                    <Icon name={r.icon as string} size={22} className={r.color === "lime" ? "text-lime" : "text-cyan"} />
                  </div>
                  <div>
                    <div className={`font-oswald font-semibold text-lg mb-1 ${r.color === "lime" ? "text-lime" : "text-cyan"}`}>
                      {r.risk}
                    </div>
                    <p className="text-white/60 font-golos text-sm leading-relaxed">{r.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </Section>
        </div>
      </section>

      {/* FINANCIAL */}
      <section className="border-t border-white/5 py-20" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <div className="text-cyan font-golos text-sm uppercase tracking-widest mb-3">Финансовая модель</div>
              <h2 className="font-oswald text-5xl font-bold uppercase">ПУТЬ К ПРИБЫЛЬНОСТИ</h2>
            </div>
          </Section>
          <Section>
            <div className="glass rounded-2xl p-8 overflow-x-auto">
              <table className="w-full font-golos">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/40 text-xs uppercase tracking-wider pb-4">Метрика</th>
                    <th className="text-center text-lime font-oswald pb-4">Месяц 1</th>
                    <th className="text-center text-cyan font-oswald pb-4">Месяц 2</th>
                    <th className="text-center text-lime font-oswald pb-4">Месяц 3</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Бюджет (₽)", vals: ["40 000", "50 000", "60 000"] },
                    { label: "Заказы", vals: ["40–60", "70–100", "100–130"] },
                    { label: "Стоимость заказа", vals: ["≤ 800₽", "≤ 600₽", "≤ 480₽"] },
                    { label: "Конверсия сайта", vals: ["2–3%", "3–4%", "4–5%"] },
                    { label: "Выручка (чек 3 000₽)", vals: ["120–180К", "210–300К", "300–390К"] },
                    { label: "Прибыль (маржа 40%)", vals: ["8–32К", "34–70К", "60–96К"] },
                    { label: "ROI", vals: ["20–80%", "68–140%", "100–160%"] },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="py-4 text-white/60 text-sm">{row.label}</td>
                      {row.vals.map((v, vi) => (
                        <td key={vi} className={`py-4 text-center font-semibold ${vi === 2 ? "text-lime" : vi === 1 ? "text-cyan" : "text-white/80"}`}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <Section>
          <div className="gradient-border rounded-3xl p-12">
            <div className="w-16 h-16 bg-lime rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-lime">
              <Icon name="Rocket" size={32} className="text-navy" />
            </div>
            <h2 className="font-oswald text-5xl font-bold uppercase mb-4">
              ГОТОВЫ ЗАПУСТИТЬ?
            </h2>
            <p className="text-white/60 font-golos text-lg mb-8 max-w-xl mx-auto">
              Обсудим бюджет, нишу и цели. Первый аудит и стратегию — бесплатно.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-lime text-navy font-oswald font-bold text-xl px-10 py-5 rounded-xl hover:brightness-110 transition-all glow-lime">
                ОБСУДИТЬ ПРОЕКТ
              </button>
              <button className="glass border border-white/20 text-white font-golos text-lg px-10 py-5 rounded-xl hover:border-lime/50 transition-all">
                Скачать КП (PDF)
              </button>
            </div>
          </div>
        </Section>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-lime flex items-center justify-center">
              <Icon name="Zap" size={14} className="text-navy" />
            </div>
            <span className="font-oswald text-white/50">КОНТЕКСТ PRO</span>
          </div>
          <div className="text-white/30 font-golos text-sm">
            Коммерческое предложение · 2026
          </div>
        </div>
      </footer>
    </div>
  );
}