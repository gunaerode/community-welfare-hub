import { useLanguage } from "../../context/LanguageContext";

interface MemberFiltersProps {
  categories: string[];
  locations: string[];
  selectedCategory: string;
  selectedLocation: string;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
}

/** Language-neutral sentinel for the "all" option — display labels are translated separately. */
const ALL_VALUE = "__all__";

export default function MemberFilters({
  categories,
  locations,
  selectedCategory,
  selectedLocation,
  onCategoryChange,
  onLocationChange,
}: MemberFiltersProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="category-filter" className="sr-only">
          {t.allCategories}
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="w-full rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 focus:border-primary-400 focus:outline-none dark:border-primary-700 dark:bg-primary-800 dark:text-white"
        >
          <option value={ALL_VALUE}>{t.allCategories}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="location-filter" className="sr-only">
          {t.allLocations}
        </label>
        <select
          id="location-filter"
          value={selectedLocation}
          onChange={(event) => onLocationChange(event.target.value)}
          className="w-full rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 focus:border-primary-400 focus:outline-none dark:border-primary-700 dark:bg-primary-800 dark:text-white"
        >
          <option value={ALL_VALUE}>{t.allLocations}</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export { ALL_VALUE };
