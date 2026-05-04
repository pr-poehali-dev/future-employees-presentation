import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/files/37ef0919-77fa-4b15-94fa-b36483bb75ee.jpg";
const FACTORY_IMG = "https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/files/ca93e281-20ae-475b-8165-009278e66650.jpg";
const BOTTLES_IMG = "https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/files/e4ff2173-9cc5-411d-9709-caa2e1796627.jpg";

const vacancies = [
  {
    title: "Купажистка",
    salary: "от 65 000",
    experience: "Без опыта",
    tag: "Горячая вакансия",
    icon: "FlaskConical",
    desc: "Приготовление напитков по рецептурам, контроль качества продукции. Опыт не нужен — всему обучим!",
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-vpk-bg min-h-screen font-roboto text-vpk-dark overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-vpk-steel shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/bucket/90d03c70-caa9-4e3c-84ef-c2a257541ee2.png"
              alt="ВПК — Вяземская производственная компания"
              className="h-12 w-auto object-contain"
            />
          </div>
          <a href="tel:+79289572254" className="flex items-center gap-2 text-vpk-blue hover:text-vpk-blue-bright transition-colors duration-300 font-medium">
            <Icon name="Phone" size={16} />
            <span className="font-roboto text-sm font-semibold hidden sm:inline">+7 928 957 22 54</span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vpk-darker/70 via-vpk-dark/60 to-vpk-darker/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-vpk-darker/50 to-transparent" />

        <div ref={heroSection.ref} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-vpk-red animate-pulse" />
              <span className="text-white text-sm font-roboto font-medium">Открытый набор сотрудников · 2025</span>
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight mb-4">
              РАБОТАЙ НА
              <br />
              <span className="text-vpk-red">
                ПРОИЗВОДСТВЕ
              </span>
            </h1>
            <p className="font-oswald text-xl md:text-2xl text-white/80 font-light tracking-widest mb-8 uppercase">
              Вяземская производственная компания
            </p>

            <p className="font-roboto text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Завод по розливу безалкогольных напитков в Вязьме. Стабильная работа, официальное оформление,
              бесплатное питание и транспорт.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#vacancies"
                className="inline-flex items-center justify-center gap-2 bg-vpk-red text-white font-oswald font-semibold px-8 py-4 rounded-lg text-lg uppercase tracking-wide hover:bg-vpk-red-bright transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Icon name="Briefcase" size={20} />
                Смотреть вакансии
              </a>
              <a
                href="tel:+79289572254"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-oswald font-semibold px-8 py-4 rounded-lg text-lg uppercase tracking-wide hover:bg-white hover:text-vpk-dark transition-all duration-300"
              >
                <Icon name="Phone" size={20} />
                Позвонить
              </a>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-vpk-steel">
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
      <section id="vacancies" className="py-24 px-6 bg-vpk-bg">
        <div className="max-w-6xl mx-auto">
          <div ref={vacanciesSection.ref} className={`text-center mb-16 transition-all duration-700 ${vacanciesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-vpk-red font-roboto text-sm uppercase tracking-widest mb-3 font-semibold">Открытые позиции</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-vpk-dark uppercase">Вакансии</h2>
            <div className="w-20 h-1 bg-vpk-blue mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacancies.map((v, i) => (
              <div
                key={i}
                className={`relative group rounded-xl border transition-all duration-500 p-6 bg-white hover:border-vpk-blue hover:shadow-lg ${vacanciesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  borderColor: "#e8edf5",
                  boxShadow: "0 1px 4px rgba(26,39,68,0.06)",
                }}
              >
                {v.hot ? (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-vpk-red text-white text-xs font-oswald font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      🔥 {v.tag}
                    </span>
                  </div>
                ) : (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-vpk-steel text-vpk-silver text-xs font-roboto px-3 py-1 rounded-full border border-vpk-steel">
                      {v.tag}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4 mt-2">
                  <div className="w-12 h-12 rounded-lg bg-vpk-blue/10 border border-vpk-blue/20 flex items-center justify-center group-hover:bg-vpk-blue/20 transition-colors duration-300">
                    <Icon name={v.icon as "Settings"} size={22} className="text-vpk-blue" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-roboto font-medium ${v.experience === "Без опыта" ? "bg-green-100 text-green-700" : "bg-vpk-blue/10 text-vpk-blue"}`}>
                    {v.experience}
                  </span>
                </div>

                <h3 className="font-oswald text-xl font-semibold text-vpk-dark mb-1 uppercase">{v.title}</h3>
                <p className="text-vpk-silver text-sm mb-4 leading-relaxed">{v.desc}</p>

                <div className="flex items-center justify-between pt-4 border-t border-vpk-steel">
                  <div>
                    <p className="text-xs text-vpk-silver mb-0.5">Заработная плата</p>
                    <p className="font-oswald text-2xl font-bold text-vpk-blue">{v.salary} <span className="text-lg">₽</span></p>
                  </div>
                  <a
                    href="#contact"
                    className="bg-vpk-blue text-white hover:bg-vpk-blue-bright font-oswald font-semibold text-sm px-4 py-2 rounded-lg uppercase tracking-wide transition-all duration-300 shadow-sm"
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
      <section id="benefits" className="py-24 px-6 bg-vpk-bg-alt">
        <div className="max-w-6xl mx-auto">
          <div ref={benefitsSection.ref} className={`text-center mb-16 transition-all duration-700 ${benefitsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-vpk-red font-roboto text-sm uppercase tracking-widest mb-3 font-semibold">Почему мы</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-vpk-dark uppercase">Преимущества</h2>
            <div className="w-20 h-1 bg-vpk-blue mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={`group p-6 rounded-xl border border-vpk-steel bg-white hover:border-vpk-blue hover:shadow-md transition-all duration-500 ${benefitsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-vpk-blue/10 border border-vpk-blue/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-vpk-blue group-hover:border-vpk-blue transition-all duration-300">
                  <Icon name={b.icon as "Shield"} size={26} className="text-vpk-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-oswald text-lg font-semibold text-vpk-dark mb-2 uppercase">{b.title}</h3>
                <p className="text-vpk-silver text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 bg-vpk-bg">
        <div className="max-w-6xl mx-auto">
          <div ref={gallerySection.ref} className={`text-center mb-16 transition-all duration-700 ${gallerySection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-vpk-red font-roboto text-sm uppercase tracking-widest mb-3 font-semibold">Наше производство</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-vpk-dark uppercase">Условия работы</h2>
            <div className="w-20 h-1 bg-vpk-blue mx-auto mt-4 rounded-full" />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${gallerySection.inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-md">
              <img src={FACTORY_IMG} alt="Цех производства" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-vpk-darker/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-oswald text-white text-xl font-semibold uppercase">Цех розлива</p>
                <p className="text-white/70 text-sm">Современное оборудование</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-md">
              <img src={BOTTLES_IMG} alt="Линия розлива" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-vpk-darker/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-oswald text-white text-xl font-semibold uppercase">Линия розлива</p>
                <p className="text-white/70 text-sm">Чистота и автоматизация</p>
              </div>
            </div>
          </div>

          <div className={`mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${gallerySection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { icon: "Clock", text: "График 4/4", sub: "по 12 часов" },
              { icon: "Moon", text: "Дневные и", sub: "ночные смены" },
              { icon: "Coffee", text: "Горячее", sub: "питание" },
              { icon: "Car", text: "Трансфер", sub: "до завода" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-vpk-steel rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-vpk-blue transition-all duration-300">
                <Icon name={item.icon as "Clock"} size={24} className="text-vpk-blue mx-auto mb-2" />
                <p className="font-oswald font-semibold text-vpk-dark text-sm uppercase">{item.text}</p>
                <p className="text-vpk-silver text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="py-24 px-6 bg-vpk-bg-alt">
        <div className="max-w-6xl mx-auto">
          <div ref={requirementsSection.ref} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-700 ${requirementsSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
              <p className="text-vpk-red font-roboto text-sm uppercase tracking-widest mb-3 font-semibold">Что мы ищем</p>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-vpk-dark uppercase mb-8">Требования</h2>
              <ul className="space-y-4">
                {requirements.map((r, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-4 transition-all duration-500 ${requirementsSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                    style={{ transitionDelay: `${i * 100 + 200}ms` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-vpk-blue flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                    <span className="text-vpk-dark font-roboto">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`transition-all duration-700 delay-200 ${requirementsSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
              <div className="bg-white border border-vpk-steel rounded-2xl p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <Icon name="Info" size={20} className="text-vpk-blue" />
                  <p className="font-oswald text-xl font-semibold text-vpk-dark uppercase">Условия работы</p>
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
                    <div key={i} className="flex justify-between items-center py-2 border-b border-vpk-steel last:border-0">
                      <span className="text-vpk-silver text-sm">{item.label}</span>
                      <span className="font-roboto font-semibold text-vpk-dark text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-vpk-bg">
        <div className="max-w-4xl mx-auto">
          <div ref={contactSection.ref} className={`text-center mb-16 transition-all duration-700 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-vpk-red font-roboto text-sm uppercase tracking-widest mb-3 font-semibold">Свяжитесь с нами</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-vpk-dark uppercase">Откликнуться</h2>
            <div className="w-20 h-1 bg-vpk-blue mx-auto mt-4 rounded-full" />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-700 delay-100 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="bg-white border border-vpk-steel rounded-2xl p-8 shadow-md">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 border border-green-200 flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-oswald text-2xl text-vpk-dark font-semibold uppercase mb-2">Заявка отправлена!</h3>
                  <p className="text-vpk-silver">Денис свяжется с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-vpk-dark text-sm font-roboto font-medium mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-vpk-bg border border-vpk-steel rounded-lg px-4 py-3 text-vpk-dark placeholder-vpk-silver/60 font-roboto focus:outline-none focus:border-vpk-blue focus:ring-2 focus:ring-vpk-blue/10 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-vpk-dark text-sm font-roboto font-medium mb-2 block">Номер телефона</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-vpk-bg border border-vpk-steel rounded-lg px-4 py-3 text-vpk-dark placeholder-vpk-silver/60 font-roboto focus:outline-none focus:border-vpk-blue focus:ring-2 focus:ring-vpk-blue/10 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-vpk-dark text-sm font-roboto font-medium mb-2 block">Интересующая вакансия</label>
                    <select
                      value={formData.vacancy}
                      onChange={e => setFormData(p => ({ ...p, vacancy: e.target.value }))}
                      className="w-full bg-vpk-bg border border-vpk-steel rounded-lg px-4 py-3 text-vpk-dark font-roboto focus:outline-none focus:border-vpk-blue focus:ring-2 focus:ring-vpk-blue/10 transition-colors duration-300"
                    >
                      <option value="">Выбрать вакансию</option>
                      {vacancies.map((v, i) => (
                        <option key={i} value={v.title}>{v.title} — {v.salary} ₽</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-vpk-blue text-white font-oswald font-bold text-lg py-4 rounded-lg uppercase tracking-wide hover:bg-vpk-blue-bright transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-oswald text-xl text-vpk-dark font-semibold uppercase mb-4">Контакты</p>
                <div className="space-y-4">
                  <a href="tel:+79289572254" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-vpk-blue/10 border border-vpk-blue/20 flex items-center justify-center group-hover:bg-vpk-blue transition-colors duration-300">
                      <Icon name="Phone" size={20} className="text-vpk-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-vpk-silver text-xs mb-0.5">Звоните напрямую</p>
                      <p className="text-vpk-dark font-roboto font-semibold">+7 928 957 22 54</p>
                      <p className="text-vpk-blue text-sm font-medium">Денис (HR)</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-vpk-blue/10 border border-vpk-blue/20 flex items-center justify-center">
                      <Icon name="MapPin" size={20} className="text-vpk-blue" />
                    </div>
                    <div>
                      <p className="text-vpk-silver text-xs mb-0.5">Адрес завода</p>
                      <p className="text-vpk-dark font-roboto font-semibold">г. Вязьма, ул. Ленина, 89а</p>
                      <p className="text-vpk-silver text-sm">ООО «ВПК»</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-vpk-blue text-white rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Zap" size={16} className="text-white" />
                  <p className="font-oswald text-white font-semibold uppercase text-sm">Быстрый старт</p>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Позвоните Денису прямо сейчас — рассмотрим вашу кандидатуру в течение дня и пригласим на собеседование.
                </p>
                <a
                  href="tel:+79289572254"
                  className="mt-4 flex items-center gap-2 text-white font-oswald font-semibold uppercase text-sm hover:gap-4 transition-all duration-300"
                >
                  Позвонить <Icon name="ArrowRight" size={16} />
                </a>
              </div>

              <div className="bg-white border border-vpk-steel rounded-xl p-5 shadow-sm">
                <p className="font-oswald text-vpk-dark font-semibold uppercase text-sm mb-3">Режим работы HR</p>
                <p className="text-vpk-silver text-sm">Пн–Пт: 09:00 – 18:00</p>
                <p className="text-vpk-silver text-sm">Сб: 10:00 – 14:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-vpk-dark border-t border-vpk-darker py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/bucket/90d03c70-caa9-4e3c-84ef-c2a257541ee2.png"
            alt="ВПК"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <p className="text-white/40 text-xs">© 2025 ВПК. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
