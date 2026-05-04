import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { vacanciesData } from "@/data/vacancies";

export default function Vacancy() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const vacancy = vacanciesData.find((v) => v.id === id);

  if (!vacancy) {
    return (
      <div className="min-h-screen bg-vpk-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-vpk-silver text-lg mb-4">Вакансия не найдена</p>
          <button onClick={() => navigate("/")} className="bg-vpk-blue text-white px-6 py-3 rounded-lg font-oswald uppercase">
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-vpk-bg min-h-screen font-roboto text-vpk-dark">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-vpk-steel shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-vpk-blue hover:text-vpk-blue-bright transition-colors duration-300">
            <Icon name="ArrowLeft" size={18} />
            <span className="font-roboto text-sm font-semibold">Все вакансии</span>
          </button>
          <img
            src="https://cdn.poehali.dev/projects/ca683cdc-ffeb-4254-9c86-275af8c0559d/bucket/90d03c70-caa9-4e3c-84ef-c2a257541ee2.png"
            alt="ВПК"
            className="h-10 w-auto object-contain"
          />
          <a href="tel:+79289572254" className="flex items-center gap-2 text-vpk-blue hover:text-vpk-blue-bright transition-colors duration-300 font-medium">
            <Icon name="Phone" size={16} />
            <span className="font-roboto text-sm font-semibold hidden sm:inline">+7 928 957 22 54</span>
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md border border-vpk-steel p-8 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              {vacancy.hot && (
                <span className="inline-block bg-vpk-red text-white text-xs font-oswald font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                  🔥 Горячая вакансия
                </span>
              )}
              <h1 className="font-oswald text-4xl md:text-5xl font-bold text-vpk-dark uppercase mb-2">{vacancy.title}</h1>
              <p className="text-vpk-silver text-lg">{vacancy.subtitle}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-vpk-silver mb-1">Заработная плата</p>
              <p className="font-oswald text-4xl font-bold text-vpk-blue">{vacancy.salary} <span className="text-2xl">₽</span></p>
              <span className={`text-xs px-3 py-1 rounded-full font-roboto font-medium mt-2 inline-block ${vacancy.experience === "Без опыта" ? "bg-green-100 text-green-700" : "bg-vpk-blue/10 text-vpk-blue"}`}>
                {vacancy.experience}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {vacancy.tags.map((tag, i) => (
              <div key={i} className="flex items-center gap-2 bg-vpk-bg border border-vpk-steel rounded-lg px-4 py-2">
                <Icon name={tag.icon as "MapPin"} size={15} className="text-vpk-blue" />
                <span className="text-vpk-dark text-sm font-medium">{tag.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-vpk-steel p-8">
              <h2 className="font-oswald text-2xl font-bold text-vpk-dark uppercase mb-4 flex items-center gap-2">
                <Icon name="FileText" size={22} className="text-vpk-blue" />
                О вакансии
              </h2>
              <p className="text-vpk-silver leading-relaxed">{vacancy.description}</p>
            </div>

            {/* Duties */}
            <div className="bg-white rounded-2xl shadow-sm border border-vpk-steel p-8">
              <h2 className="font-oswald text-2xl font-bold text-vpk-dark uppercase mb-5 flex items-center gap-2">
                <Icon name="ListChecks" size={22} className="text-vpk-blue" />
                Обязанности
              </h2>
              <ul className="space-y-3">
                {vacancy.duties.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-vpk-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                    <span className="text-vpk-dark leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-sm border border-vpk-steel p-8">
              <h2 className="font-oswald text-2xl font-bold text-vpk-dark uppercase mb-5 flex items-center gap-2">
                <Icon name="UserCheck" size={22} className="text-vpk-blue" />
                Требования
              </h2>
              <ul className="space-y-3">
                {vacancy.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-vpk-bg-alt border border-vpk-steel flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={12} className="text-vpk-blue" />
                    </div>
                    <span className="text-vpk-dark leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important */}
            {vacancy.important && vacancy.important.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-vpk-steel p-8">
                <h2 className="font-oswald text-2xl font-bold text-vpk-dark uppercase mb-5 flex items-center gap-2">
                  <Icon name="Star" size={22} className="text-vpk-blue" />
                  Для нас важно
                </h2>
                <ul className="space-y-3">
                  {vacancy.important.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-vpk-blue/10 border border-vpk-blue/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Star" size={11} className="text-vpk-blue" />
                      </div>
                      <span className="text-vpk-dark leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Conditions */}
            {vacancy.conditions && vacancy.conditions.length > 0 && (
              <div className="bg-green-50 rounded-2xl shadow-sm border border-green-200 p-8">
                <h2 className="font-oswald text-2xl font-bold text-vpk-dark uppercase mb-5 flex items-center gap-2">
                  <Icon name="Gift" size={22} className="text-green-600" />
                  Условия
                </h2>
                <ul className="space-y-3">
                  {vacancy.conditions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={12} className="text-white" />
                      </div>
                      <span className="text-vpk-dark leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Photos */}
            {vacancy.photos && vacancy.photos.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-vpk-steel p-8">
                <h2 className="font-oswald text-2xl font-bold text-vpk-dark uppercase mb-5 flex items-center gap-2">
                  <Icon name="Camera" size={22} className="text-vpk-blue" />
                  Рабочее место
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vacancy.photos.map((photo, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden aspect-video group">
                      <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-vpk-darker/70 to-transparent" />
                      <p className="absolute bottom-3 left-3 text-white text-sm font-medium font-oswald uppercase">{photo.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="bg-vpk-blue rounded-2xl p-6 text-white sticky top-24">
              <h3 className="font-oswald text-xl font-bold uppercase mb-2">Заинтересовала вакансия?</h3>
              <p className="text-white/80 text-sm mb-5 leading-relaxed">Звоните Денису — рассмотрим вашу кандидатуру в течение дня.</p>
              <a
                href="tel:+79289572254"
                className="w-full flex items-center justify-center gap-2 bg-white text-vpk-blue font-oswald font-bold text-base py-3 rounded-xl uppercase tracking-wide hover:bg-vpk-bg transition-all duration-300 shadow-sm"
              >
                <Icon name="Phone" size={18} />
                +7 928 957 22 54
              </a>
              <p className="text-white/60 text-xs text-center mt-3">Евгений (HR) · Пн–Пт 9:00–18:00</p>
            </div>

            {/* Conditions */}
            <div className="bg-white rounded-2xl border border-vpk-steel p-6 shadow-sm">
              <h3 className="font-oswald text-lg font-bold text-vpk-dark uppercase mb-4 flex items-center gap-2">
                <Icon name="Info" size={18} className="text-vpk-blue" />
                Условия
              </h3>
              <div className="space-y-3">
                {[
                  { label: "График", value: "4/4 по 12 часов" },
                  { label: "Оплата", value: "2 раза в месяц" },
                  { label: "Переработки", value: "Двойная оплата" },
                  { label: "Оформление", value: "По ТК РФ" },
                  { label: "Питание", value: "Бесплатно" },
                  { label: "Трансфер", value: "Бесплатный автобус" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-vpk-steel last:border-0">
                    <span className="text-vpk-silver text-sm">{item.label}</span>
                    <span className="font-roboto font-semibold text-vpk-dark text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-vpk-steel p-6 shadow-sm">
              <h3 className="font-oswald text-lg font-bold text-vpk-dark uppercase mb-4 flex items-center gap-2">
                <Icon name="MapPin" size={18} className="text-vpk-blue" />
                Адреса заводов
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-vpk-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">1</div>
                  <p className="text-vpk-dark text-sm">г. Вязьма, ул. Ленина, 89а</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-vpk-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">2</div>
                  <p className="text-vpk-dark text-sm">г. Вязьма, ул. Элеваторная, 18</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-vpk-dark border-t border-vpk-darker py-6 px-6">
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