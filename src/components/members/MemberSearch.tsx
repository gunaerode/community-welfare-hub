import { useLanguage } from "../../context/LanguageContext";

interface MemberSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MemberSearch({ value, onChange }: MemberSearchProps) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full sm:max-w-xs">
      <label htmlFor="member-search" className="sr-only">
        {t.searchPlaceholder}
      </label>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary-400" aria-hidden="true">
        🔍
      </span>
      <input
        id="member-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.searchPlaceholder}
        className="w-full rounded-full border border-primary-200 bg-white py-2.5 pl-10 pr-4 text-sm text-primary-900 placeholder:text-primary-400 focus:border-primary-400 focus:outline-none dark:border-primary-700 dark:bg-primary-800 dark:text-white dark:placeholder:text-primary-500"
      />
    </div>
  );
}
