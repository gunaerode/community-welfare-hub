import { useLanguage } from "../../context/LanguageContext";
import Icon from "../common/Icon";

interface MemberSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MemberSearch({ value, onChange }: MemberSearchProps) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full">
      <label htmlFor="member-search" className="sr-only">
        {t.searchPlaceholder}
      </label>
      <Icon
        name="search"
        className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-primary-400"
      />
      <input
        id="member-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.searchPlaceholder}
        className="field-input rounded-full py-3.5 pr-11 pl-12 text-base shadow-soft"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={t.clearFilters}
          className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-800"
        >
          <Icon name="x" className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
