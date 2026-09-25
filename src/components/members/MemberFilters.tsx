import { useLanguage } from "../../context/LanguageContext";
import Icon from "../common/Icon";

interface MemberFiltersProps {
  categories: { value: string; count: number }[];
  locations: string[];
  selectedCategory: string;
  selectedLocation: string;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
}

/** Language-neutral sentinel for the "all" option — display labels are translated separately. */
const ALL_VALUE = "__all__";

/** Category chips (horizontally scrollable on phones) + a location dropdown. */
export default function MemberFilters({
  categories,
  locations,
  selectedCategory,
  selectedLocation,
  onCategoryChange,
  onLocationChange,
}: MemberFiltersProps) {
  const { t } = useLanguage();
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  const chip = (active: boolean) =>
    `inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
      active
        ? "border-primary-700 bg-primary-700 text-white shadow-sm"
        : "border-primary-200 bg-white text-primary-700 hover:border-primary-400 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-100"
    }`;

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div
        role="group"
        aria-label={t.allCategories}
        className="no-scrollbar -mx-4 flex flex-1 gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <button type="button" className={chip(selectedCategory === ALL_VALUE)} aria-pressed={selectedCategory === ALL_VALUE} onClick={() => onCategoryChange(ALL_VALUE)}>
          {t.categoryAll}
          <span className="rounded-full bg-black/10 px-1.5 text-xs dark:bg-white/10">{total}</span>
        </button>
        {categories.map(({ value, count }) => (
          <button
            key={value}
            type="button"
            className={chip(selectedCategory === value)}
            aria-pressed={selectedCategory === value}
            onClick={() => onCategoryChange(selectedCategory === value ? ALL_VALUE : value)}
          >
            {value}
            <span className="rounded-full bg-black/10 px-1.5 text-xs dark:bg-white/10">{count}</span>
          </button>
        ))}
      </div>

      <div className="relative lg:w-60">
        <label htmlFor="location-filter" className="sr-only">
          {t.allLocations}
        </label>
        <Icon name="mapPin" className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-primary-400" />
        <select
          id="location-filter"
          value={selectedLocation}
          onChange={(event) => onLocationChange(event.target.value)}
          className="field-input appearance-none rounded-full py-2.5 pr-10 pl-10"
        >
          <option value={ALL_VALUE}>{t.allLocations}</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-primary-400" />
      </div>
    </div>
  );
}

export { ALL_VALUE };
