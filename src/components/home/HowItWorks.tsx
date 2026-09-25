import type { CSSProperties } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Icon, { type IconName } from "../common/Icon";

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps: { icon: IconName; title: string; text: string }[] = [
    { icon: "userPlus", title: t.step1Title, text: t.step1Text },
    { icon: "calendar", title: t.step2Title, text: t.step2Text },
    { icon: "heartHand", title: t.step3Title, text: t.step3Text },
  ];

  return (
    <section aria-labelledby="how-heading" className="relative overflow-hidden bg-primary-900 py-16 text-white sm:py-20 dark:bg-primary-900/60">
      <div className="bg-dots-light absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative container-page">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="eyebrow bg-white/10 text-accent-300 dark:bg-white/10">{t.howEyebrow}</span>
          <h2 id="how-heading" className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t.howHeading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-primary-100 sm:text-base">{t.howSubtitle}</p>
        </div>

        <div className="relative mt-12">
          <div
            className="absolute top-9 right-[16%] left-[16%] hidden h-0.5 bg-gradient-to-r from-accent-500/0 via-accent-500/60 to-accent-500/0 md:block"
            aria-hidden="true"
          />
          <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as CSSProperties}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-3xl bg-gradient-to-br from-accent-400 to-accent-600 text-primary-950 shadow-lg shadow-accent-900/30">
                <Icon name={step.icon} className="h-8 w-8" />
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-extrabold text-primary-800 shadow">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-primary-200">{step.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
