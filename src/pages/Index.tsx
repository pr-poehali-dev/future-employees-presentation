import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const FACTORY_IMG = "https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/files/ca93e281-20ae-475b-8165-009278e66650.jpg";
const BOTTLES_IMG = "https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/files/e4ff2173-9cc5-411d-9709-caa2e1796627.jpg";

const vacancies = [
  {
    title: "Купажистка",
    salary: "от 65 000",
    experience: "С опытом",
    tag: "Горячая вакансия",
    icon: "FlaskConical",
    desc: "Приготовление напитков по рецептурам, контроль качества продукции",
    hot: true,
  },
  {
    title: "Мастер смены",
    salary: "от 56 000",
    experience: "С опытом",
    tag: "Руководящая",
    icon: "Settings",
    desc: "Организация работы цеха, контроль технологического процесса",
    hot: false,
  },
  {
    title: "Оператор линии",
    salary: "от 50 000",
    experience: "С опытом",
    tag: "Производство",
    icon: "Gauge",
    desc: "Управление оборудованием линии розлива напитков",
    hot: false,
  },
  {
    title: "Укладчик-упаковщик",
    salary: "от 40 000",
    experience: "Без опыта",
    tag: "Стартовая",
    icon: "Package",
    desc: "Упаковка и укладка готовой продукции, без опыта — обучим",
    hot: false,
  },
  {
    title: "Уборщица",
    salary: "от 31 000",
    experience: "Без опыта",
    tag: "Чистота",
    icon: "Sparkles",
    desc: "Поддержание чистоты в производственных помещениях",
    hot: false,
  },
];

const benefits = [
  { icon: "UtensilsCrossed", title: "Бесплатное питание", desc: "Горячие обеды за счёт компании каждую смену" },
  { icon: "Bus", title: "Развозка", desc: "Бесплатный автобус до завода и обратно" },
  { icon: "Factory", title: "Новое производство", desc: "Современное чистое оборудование европейского класса" },
  { icon: "Banknote", title: "2 раза в месяц", desc: "Стабильные выплаты без задержек, строго по договору" },
  { icon: "TrendingUp", title: "Двойная переработка", desc: "Оплата сверхурочных строго по ТК РФ — в двойном размере" },
  { icon: "Shield", title: "Официальное трудоустройство", desc: "Оформление по ТК РФ с первого рабочего дня" },
];

const requirements = [
  "Ответственное отношение к работе",
  "Высокая работоспособность",
  "Быстрая обучаемость",
  "Готовность к интенсивному ритму",
  "Пунктуальность и аккуратность",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    const dur = 1200;
    const step = 16;
    const inc = target / (dur / step);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setVal(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, step);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{val.toLocaleString("ru-RU")}{suffix}</span>;
}

export default function Index() {
  const [formData, setFormData] = useState({ name: "", phone: "", vacancy: "" });
  const [submitted, setSubmitted] = useState(false);

  const heroSection = useInView(0.1);
  const vacanciesSection = useInView(0.1);
  const benefitsSection = useInView(0.05);
  const requirementsSection = useInView(0.1);
  const gallerySection = useInView(0.1);
  const contactSection = useInView(0.1);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 5.5) % 90}%`,
    animationDuration: `${6 + (i * 1.3) % 8}s`,
    animationDelay: `${(i * 0.7) % 6}s`,
    size: `${2 + (i % 3)}px`,
  }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-vpk-dark min-h-screen font-roboto text-vpk-light overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-vpk-darker/90 backdrop-blur-md border-b border-vpk-steel/30">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-vpk-blue flex items-center justify-center">
              <span className="text-vpk-dark font-oswald font-bold text-sm">ВПК</span>
            </div>
            <div>
              <p className="font-oswald text-sm font-semibold text-white leading-none">Вяземская</p>
              <p className="text-vpk-silver text-xs">производственная компания</p>
            </div>
          </div>
          <a href="tel:+79289572254" className="flex items-center gap-2 text-vpk-blue hover:text-vpk-blue-bright transition-colors duration-300">
            <Icon name="Phone" size={14} />
            <span className="font-roboto text-sm font-medium hidden sm:inline">+7 928 957 22 54</span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${FACTORY_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vpk-darker/80 via-vpk-darker/70 to-vpk-darker" />
        <div className="absolute inset-0 bg-gradient-to-r from-vpk-darker/60 to-transparent" />

        {/* particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-vpk-blue opacity-40"
              style={{
                left: p.left,
                bottom: "-10px",
                width: p.size,
                height: p.size,
                animation: `particle ${p.animationDuration} ${p.animationDelay} linear infinite`,
              }}
            />
          ))}
        </div>

        <div ref={heroSection.ref} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="inline-flex items-center gap-2 bg-vpk-blue/10 border border-vpk-blue/30 rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-vpk-blue animate-pulse" />
              <span className="text-vpk-blue text-sm font-roboto font-medium">Открытый набор сотрудников · 2025</span>
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight mb-4">
              РАБОТАЙ НА
              <br />
              <span className="text-vpk-blue" style={{ textShadow: "0 0 40px rgba(0,180,216,0.5)" }}>
                ПРОИЗВОДСТВЕ
              </span>
            </h1>
            <p className="font-oswald text-xl md:text-2xl text-vpk-silver font-light tracking-widest mb-8 uppercase">
              Вяземская производственная компания
            </p>

            <p className="font-roboto text-lg text-vpk-light/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Завод по розливу безалкогольных напитков в Вязьме. Стабильная работа, официальное оформление,
              бесплатное питание и транспорт.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#vacancies"
                className="inline-flex items-center justify-center gap-2 bg-vpk-blue text-vpk-dark font-oswald font-semibold px-8 py-4 rounded-lg text-lg uppercase tracking-wide hover:bg-vpk-blue-bright transition-all duration-300 hover:scale-105"
                style={{ boxShadow: "0 0 30px rgba(0,180,216,0.3)" }}
              >
                <Icon name="Briefcase" size={20} />
                Смотреть вакансии
              </a>
              <a
                href="tel:+79289572254"
                className="inline-flex items-center justify-center gap-2 border border-vpk-blue/50 text-vpk-blue font-oswald font-semibold px-8 py-4 rounded-lg text-lg uppercase tracking-wide hover:bg-vpk-blue/10 transition-all duration-300"
              >
                <Icon name="Phone" size={20} />
                Позвонить сейчас
              </a>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-vpk-steel/60 backdrop-blur-sm border-t border-vpk-blue/20">
          <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Вакансий открыто", value: 5, suffix: "" },
              { label: "Макс. зарплата, ₽", value: 65000, suffix: "" },
              { label: "Часов в смене", value: 12, suffix: "" },
              { label: "Выплат в месяц", value: 2, suffix: "" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-oswald text-2xl md:text-3xl font-bold text-vpk-blue">
                  <AnimatedNumber target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-vpk-silver text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VACANCIES */}
      <section id="vacancies" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={vacanciesSection.ref} className={`text-center mb-16 transition-all duration-700 ${vacanciesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-vpk-blue font-roboto text-sm uppercase tracking-widest mb-3">Открытые позиции</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase">Вакансии</h2>
            <div className="w-20 h-0.5 bg-vpk-blue mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacancies.map((v, i) => (
              <div
                key={i}
                className={`relative group rounded-xl border transition-all duration-500 p-6 hover:border-vpk-blue/60 hover:shadow-lg ${vacanciesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  background: "rgba(30,42,58,0.6)",
                  borderColor: "rgba(30,42,58,0.8)",
                }}
              >
                {v.hot ? (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-vpk-blue text-vpk-dark text-xs font-oswald font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      🔥 {v.tag}
                    </span>
                  </div>
                ) : (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-vpk-steel text-vpk-silver text-xs font-roboto px-3 py-1 rounded-full">
                      {v.tag}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4 mt-2">
                  <div className="w-12 h-12 rounded-lg bg-vpk-blue/10 border border-vpk-blue/20 flex items-center justify-center group-hover:bg-vpk-blue/20 transition-colors duration-300">
                    <Icon name={v.icon as "Settings"} size={22} className="text-vpk-blue" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-roboto ${v.experience === "Без опыта" ? "bg-green-900/40 text-green-400" : "bg-vpk-blue/10 text-vpk-blue"}`}>
                    {v.experience}
                  </span>
                </div>

                <h3 className="font-oswald text-xl font-semibold text-white mb-1 uppercase">{v.title}</h3>
                <p className="text-vpk-silver text-sm mb-4 leading-relaxed">{v.desc}</p>

                <div className="flex items-center justify-between pt-4 border-t border-vpk-steel/50">
                  <div>
                    <p className="text-xs text-vpk-silver mb-0.5">Заработная плата</p>
                    <p className="font-oswald text-2xl font-bold text-vpk-blue">{v.salary} <span className="text-lg">₽</span></p>
                  </div>
                  <a
                    href="#contact"
                    className="bg-vpk-blue/10 hover:bg-vpk-blue text-vpk-blue hover:text-vpk-dark border border-vpk-blue/30 font-oswald font-semibold text-sm px-4 py-2 rounded-lg uppercase tracking-wide transition-all duration-300"
                  >
                    Откликнуться
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-24 px-6 bg-vpk-darker/60 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,180,216,0.4) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />

        <div className="max-w-6xl mx-auto relative">
          <div ref={benefitsSection.ref} className={`text-center mb-16 transition-all duration-700 ${benefitsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-vpk-blue font-roboto text-sm uppercase tracking-widest mb-3">Почему мы</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase">Преимущества</h2>
            <div className="w-20 h-0.5 bg-vpk-blue mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={`group p-6 rounded-xl border border-vpk-steel/50 bg-vpk-steel/20 hover:border-vpk-blue/40 hover:bg-vpk-blue/5 transition-all duration-500 ${benefitsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-vpk-blue/10 border border-vpk-blue/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-vpk-blue/20 transition-all duration-300">
                  <Icon name={b.icon as "Shield"} size={26} className="text-vpk-blue" />
                </div>
                <h3 className="font-oswald text-lg font-semibold text-white mb-2 uppercase">{b.title}</h3>
                <p className="text-vpk-silver text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={gallerySection.ref} className={`text-center mb-16 transition-all duration-700 ${gallerySection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-vpk-blue font-roboto text-sm uppercase tracking-widest mb-3">Наше производство</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase">Условия работы</h2>
            <div className="w-20 h-0.5 bg-vpk-blue mx-auto mt-4" />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${gallerySection.inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="relative rounded-2xl overflow-hidden aspect-video group">
              <img src={FACTORY_IMG} alt="Цех производства" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-vpk-darker/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-oswald text-white text-xl font-semibold uppercase">Цех розлива</p>
                <p className="text-vpk-silver text-sm">Современное оборудование</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video group">
              <img src={BOTTLES_IMG} alt="Линия розлива" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-vpk-darker/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-oswald text-white text-xl font-semibold uppercase">Линия розлива</p>
                <p className="text-vpk-silver text-sm">Чистота и автоматизация</p>
              </div>
            </div>
          </div>

          <div className={`mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${gallerySection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { icon: "Clock", text: "График 4/4", sub: "по 12 часов" },
              { icon: "Moon", text: "Дневные и", sub: "ночные смены" },
              { icon: "MapPin", text: "Вязьма", sub: "ул. Ленина, 89а" },
              { icon: "Users", text: "Дружный", sub: "коллектив" },
            ].map((item, i) => (
              <div key={i} className="bg-vpk-steel/20 border border-vpk-steel/40 rounded-xl p-4 text-center">
                <Icon name={item.icon as "Clock"} size={24} className="text-vpk-blue mx-auto mb-2" />
                <p className="font-oswald text-white font-semibold">{item.text}</p>
                <p className="text-vpk-silver text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="py-24 px-6 bg-vpk-darker/40">
        <div className="max-w-6xl mx-auto">
          <div ref={requirementsSection.ref} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-700 ${requirementsSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
              <p className="text-vpk-blue font-roboto text-sm uppercase tracking-widest mb-3">Что мы ищем</p>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase mb-8">Требования</h2>
              <ul className="space-y-4">
                {requirements.map((r, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-4 transition-all duration-500 ${requirementsSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                    style={{ transitionDelay: `${i * 100 + 200}ms` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-vpk-blue/10 border border-vpk-blue/30 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-vpk-blue" />
                    </div>
                    <span className="text-vpk-light font-roboto">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`transition-all duration-700 delay-200 ${requirementsSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
              <div
                className="bg-vpk-steel/20 border border-vpk-blue/20 rounded-2xl p-8"
                style={{ boxShadow: "0 0 40px rgba(0,180,216,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon name="Info" size={20} className="text-vpk-blue" />
                  <p className="font-oswald text-xl font-semibold text-white uppercase">Условия работы</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "График", value: "4/4 по 12 часов" },
                    { label: "Смены", value: "Дневные и ночные" },
                    { label: "Оплата", value: "2 раза в месяц" },
                    { label: "Переработки", value: "Двойная оплата" },
                    { label: "Оформление", value: "По ТК РФ" },
                    { label: "Стабильность", value: "Без простоев" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-vpk-steel/40 last:border-0">
                      <span className="text-vpk-silver text-sm">{item.label}</span>
                      <span className="font-roboto font-medium text-white text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-vpk-blue/5 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <div ref={contactSection.ref} className={`text-center mb-16 transition-all duration-700 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-vpk-blue font-roboto text-sm uppercase tracking-widest mb-3">Свяжитесь с нами</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase">Откликнуться</h2>
            <div className="w-20 h-0.5 bg-vpk-blue mx-auto mt-4" />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-700 delay-100 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="bg-vpk-steel/20 border border-vpk-steel/50 rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-vpk-blue/10 border border-vpk-blue/30 flex items-center justify-center mx-auto mb-4" style={{ animation: "float 3s ease-in-out infinite" }}>
                    <Icon name="CheckCircle" size={32} className="text-vpk-blue" />
                  </div>
                  <h3 className="font-oswald text-2xl text-white font-semibold uppercase mb-2">Заявка отправлена!</h3>
                  <p className="text-vpk-silver">Денис свяжется с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-vpk-silver text-sm font-roboto mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-vpk-dark border border-vpk-steel/60 rounded-lg px-4 py-3 text-white placeholder-vpk-silver/50 font-roboto focus:outline-none focus:border-vpk-blue transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-vpk-silver text-sm font-roboto mb-2 block">Номер телефона</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-vpk-dark border border-vpk-steel/60 rounded-lg px-4 py-3 text-white placeholder-vpk-silver/50 font-roboto focus:outline-none focus:border-vpk-blue transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-vpk-silver text-sm font-roboto mb-2 block">Интересующая вакансия</label>
                    <select
                      value={formData.vacancy}
                      onChange={e => setFormData(p => ({ ...p, vacancy: e.target.value }))}
                      className="w-full bg-vpk-dark border border-vpk-steel/60 rounded-lg px-4 py-3 text-white font-roboto focus:outline-none focus:border-vpk-blue transition-colors duration-300"
                    >
                      <option value="">Выбрать вакансию</option>
                      {vacancies.map((v, i) => (
                        <option key={i} value={v.title}>{v.title} — {v.salary} ₽</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-vpk-blue text-vpk-dark font-oswald font-bold text-lg py-4 rounded-lg uppercase tracking-wide hover:bg-vpk-blue-bright transition-all duration-300 hover:scale-105"
                  >
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-oswald text-xl text-white font-semibold uppercase mb-4">Контакты</p>
                <div className="space-y-4">
                  <a href="tel:+79289572254" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-vpk-blue/10 border border-vpk-blue/20 flex items-center justify-center group-hover:bg-vpk-blue/20 transition-colors duration-300">
                      <Icon name="Phone" size={20} className="text-vpk-blue" />
                    </div>
                    <div>
                      <p className="text-vpk-silver text-xs mb-0.5">Звоните напрямую</p>
                      <p className="text-white font-roboto font-medium">+7 928 957 22 54</p>
                      <p className="text-vpk-blue text-sm">Денис (HR)</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-vpk-blue/10 border border-vpk-blue/20 flex items-center justify-center">
                      <Icon name="MapPin" size={20} className="text-vpk-blue" />
                    </div>
                    <div>
                      <p className="text-vpk-silver text-xs mb-0.5">Адрес завода</p>
                      <p className="text-white font-roboto font-medium">г. Вязьма, ул. Ленина, 89а</p>
                      <p className="text-vpk-silver text-sm">ООО «ВПК»</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-vpk-blue/5 border border-vpk-blue/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Zap" size={16} className="text-vpk-blue" />
                  <p className="font-oswald text-white font-semibold uppercase text-sm">Быстрый старт</p>
                </div>
                <p className="text-vpk-silver text-sm leading-relaxed">
                  Позвоните Денису прямо сейчас — рассмотрим вашу кандидатуру в течение дня и пригласим на собеседование.
                </p>
                <a
                  href="tel:+79289572254"
                  className="mt-4 flex items-center gap-2 text-vpk-blue hover:text-vpk-blue-bright font-oswald font-semibold uppercase text-sm transition-colors duration-300"
                >
                  Позвонить <Icon name="ArrowRight" size={16} />
                </a>
              </div>

              <div className="bg-vpk-steel/20 border border-vpk-steel/40 rounded-xl p-5">
                <p className="font-oswald text-white font-semibold uppercase text-sm mb-3">Режим работы HR</p>
                <p className="text-vpk-silver text-sm">Пн–Пт: 09:00 – 18:00</p>
                <p className="text-vpk-silver text-sm">Сб: 10:00 – 14:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-vpk-darker border-t border-vpk-steel/30 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-vpk-blue flex items-center justify-center">
              <span className="text-vpk-dark font-oswald font-bold text-sm">ВПК</span>
            </div>
            <div>
              <p className="font-oswald text-sm font-semibold text-white leading-none">ООО «Вяземская производственная компания»</p>
              <p className="text-vpk-silver text-xs">г. Вязьма, ул. Ленина, 89а</p>
            </div>
          </div>
          <p className="text-vpk-silver/50 text-xs">© 2025 ВПК. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
