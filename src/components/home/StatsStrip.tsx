import { pick, useLanguage } from "../../context/LanguageContext";
import { useMembers } from "../../services/siteData";
import Icon, { type IconName } from "../common/Icon";

/** Quick numbers card that overlaps the bottom of the hero. */
export default function StatsStrip() {
  const { lang, t } = useLanguage();
  const { members } = useMembers();
  const towns = new Set(members.map((m) => (m.location ? pick(lang, m.location, m.locationEn) : "")).filter(Boolean));

  const stats: { icon: IconName; value: string; label: string }[] = [
    { icon: "store", value: String(members.length), label: t.heroStatMembers },
    { icon: "mapPin", value: String(towns.size), label: t.heroStatPlaces },
    { icon: "wallet", value: "₹500", label: t.heroStatMonthly },
    { icon: "heartHand", value: "₹5000", label: t.heroStatMaxHelp },
  ];

  return (
    <div className="relative z-10 container-page -mt-14">
      <dl className="card grid grid-cols-2 divide-primary-100 overflow-hidden sm:grid-cols-4 sm:divide-x dark:divide-primary-800">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className="flex flex-col items-center gap-1 px-3 py-5 text-center sm:py-6"
          >
            <Icon name={stat.icon} className="mb-1 h-5 w-5 text-accent-600 dark:text-accent-400" />
            <dd className="text-2xl font-extrabold text-primary-900 sm:text-3xl dark:text-white">{stat.value}</dd>
            <dt className="text-xs font-medium text-primary-600 sm:text-sm dark:text-primary-300">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
