import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { vacanciesData } from "@/data/vacancies";

const HERO_IMG = "https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/files/37ef0919-77fa-4b15-94fa-b36483bb75ee.jpg";
const CANNING_IMG = "https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/files/bf591a3b-99bf-4ab0-9963-462ff3a2f86e.jpg";
const PACKING_IMG = "https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/files/e2c2359d-2108-4ed1-bb20-d74ac802de9e.jpg";

const benefits = [
  { icon: "UtensilsCrossed", title: "Бесплатное питание", desc: "Горячие обеды за счёт компании каждую смену" },
  { icon: "Bus", title: "Развозка", desc: "Бесплатный автобус до завода и обратно" },
  { icon: "Factory", title: "Новое производство", desc: "Современное чистое оборудование европейского класса" },
  { icon: "Banknote", title: "2 раза в месяц", desc: "Стабильные выплаты без задержек, строго по договору" },
  { icon: "TrendingUp", title: "Двойная переработка", desc: "Оплата сверхурочных строго по ТК РФ — в двойном размере" },
  { icon: "Shield", title: "Официальное трудоустройство", desc: "Оформление по ТК РФ с первого рабочего дня" },
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
  const navigate = useNavigate();
  const heroSection = useInView(0.1);
  const vacanciesSection = useInView(0.1);
  const benefitsSection = useInView(0.05);
  const gallerySection = useInView(0.1);
  const contactSection = useInView(0.1);

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
              <span className="text-green-500">
                ПРОИЗВОДСТВЕ
              </span>
            </h1>
            <p className="font-oswald text-xl md:text-2xl text-white/80 font-light tracking-widest mb-8 uppercase">
              Вяземская производственная компания
            </p>

            <p className="font-roboto text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Завод по производству безалкогольных напитков в алюминиевой банке в Вязьме.
              Стабильная работа, официальное оформление, бесплатное питание и транспорт.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#vacancies"
                className="inline-flex items-center justify-center gap-2 bg-vpk-blue text-white font-oswald font-semibold px-8 py-4 rounded-lg text-lg uppercase tracking-wide hover:bg-vpk-blue-bright transition-all duration-300 hover:scale-105 shadow-lg"
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
              { label: "Вакансий открыто", value: 6, suffix: "" },
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
            <p className="text-vpk-blue font-roboto text-sm uppercase tracking-widest mb-3 font-semibold">Открытые позиции</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-vpk-dark uppercase">Вакансии</h2>
            <div className="w-20 h-1 bg-vpk-blue mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacanciesData.map((v, i) => (
              <div
                key={v.id}
                onClick={() => navigate(`/vacancy/${v.id}`)}
                className={`relative group rounded-xl border transition-all duration-500 p-6 bg-white hover:border-vpk-blue hover:shadow-lg cursor-pointer ${vacanciesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  borderColor: "#e8edf5",
                  boxShadow: "0 1px 4px rgba(26,39,68,0.06)",
                }}
              >
                {v.hot ? (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-vpk-red text-white text-xs font-oswald font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      🔥 Горячая вакансия
                    </span>
                  </div>
                ) : (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-vpk-steel text-vpk-silver text-xs font-roboto px-3 py-1 rounded-full border border-vpk-steel">
                      {v.tags[0]?.text || "Вакансия"}
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
                <p className="text-vpk-silver text-sm mb-4 leading-relaxed line-clamp-2">{v.shortDesc}</p>

                <div className="flex items-center justify-between pt-4 border-t border-vpk-steel">
                  <div>
                    <p className="text-xs text-vpk-silver mb-0.5">Заработная плата</p>
                    <p className="font-oswald text-2xl font-bold text-vpk-blue">{v.salary} <span className="text-lg">₽</span></p>
                  </div>
                  <span className="flex items-center gap-1 text-vpk-blue font-oswald font-semibold text-sm uppercase tracking-wide group-hover:gap-2 transition-all duration-300">
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </span>
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
            <p className="text-vpk-blue font-roboto text-sm uppercase tracking-widest mb-3 font-semibold">Почему мы</p>
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
            <p className="text-vpk-blue font-roboto text-sm uppercase tracking-widest mb-3 font-semibold">Наше производство</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-vpk-dark uppercase">Условия работы</h2>
            <div className="w-20 h-1 bg-vpk-blue mx-auto mt-4 rounded-full" />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${gallerySection.inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-md">
              <img src={CANNING_IMG} alt="Линия розлива банок" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-vpk-darker/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-oswald text-white text-xl font-semibold uppercase">Линия розлива банок</p>
                <p className="text-white/70 text-sm">Европейское оборудование</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-md">
              <img src={PACKING_IMG} alt="Цех упаковки" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-vpk-darker/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-oswald text-white text-xl font-semibold uppercase">Цех упаковки</p>
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

          {/* Addresses */}
          <div className={`mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 delay-300 ${gallerySection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-white border border-vpk-steel rounded-xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-vpk-blue text-white flex items-center justify-center flex-shrink-0 font-oswald font-bold">1</div>
              <div>
                <p className="font-oswald font-bold text-vpk-dark uppercase text-sm mb-0.5">Завод №1</p>
                <p className="text-vpk-dark font-medium">г. Вязьма, ул. Ленина, 89а</p>
                <p className="text-vpk-silver text-sm">ООО «ВПК» · Розлив напитков</p>
              </div>
            </div>
            <div className="bg-white border border-vpk-steel rounded-xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-vpk-blue text-white flex items-center justify-center flex-shrink-0 font-oswald font-bold">2</div>
              <div>
                <p className="font-oswald font-bold text-vpk-dark uppercase text-sm mb-0.5">Завод №2</p>
                <p className="text-vpk-dark font-medium">г. Вязьма, ул. Элеваторная, 18</p>
                <p className="text-vpk-silver text-sm">ООО «ВПК» · Производственная площадка</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-vpk-bg-alt">
        <div className="max-w-2xl mx-auto">
          <div ref={contactSection.ref} className={`text-center mb-12 transition-all duration-700 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-vpk-blue font-roboto text-sm uppercase tracking-widest mb-3 font-semibold">Свяжитесь с нами</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-vpk-dark uppercase">Откликнуться</h2>
            <div className="w-20 h-1 bg-vpk-blue mx-auto mt-4 rounded-full" />
          </div>

          <div className={`transition-all duration-700 delay-100 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="bg-vpk-blue rounded-2xl p-8 text-white text-center shadow-lg mb-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="Phone" size={28} className="text-white" />
              </div>
              <h3 className="font-oswald text-2xl font-bold uppercase mb-2">Позвоните Денису</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Рассмотрим вашу кандидатуру в течение дня и пригласим на собеседование. Никаких долгих ожиданий.
              </p>
              <a
                href="tel:+79289572254"
                className="inline-flex items-center justify-center gap-3 bg-white text-vpk-blue font-oswald font-bold text-xl py-4 px-10 rounded-xl uppercase tracking-wide hover:bg-vpk-bg transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <Icon name="Phone" size={22} />
                +7 928 957 22 54
              </a>
              <p className="text-white/50 text-sm mt-4">Денис (HR) · Пн–Пт 9:00–18:00 · Сб 10:00–14:00</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-vpk-steel rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-vpk-blue/10 border border-vpk-blue/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={18} className="text-vpk-blue" />
                </div>
                <div>
                  <p className="text-vpk-silver text-xs mb-1">Заводы</p>
                  <p className="text-vpk-dark text-sm font-medium">Ленина, 89а</p>
                  <p className="text-vpk-dark text-sm font-medium">Элеваторная, 18</p>
                  <p className="text-vpk-silver text-xs">г. Вязьма</p>
                </div>
              </div>
              <div className="bg-white border border-vpk-steel rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-vpk-blue/10 border border-vpk-blue/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={18} className="text-vpk-blue" />
                </div>
                <div>
                  <p className="text-vpk-silver text-xs mb-1">Режим работы HR</p>
                  <p className="text-vpk-dark text-sm font-medium">Пн–Пт: 09:00 – 18:00</p>
                  <p className="text-vpk-dark text-sm font-medium">Сб: 10:00 – 14:00</p>
                </div>
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