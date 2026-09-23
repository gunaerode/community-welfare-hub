interface MemberFiltersProps {
  categories: string[];
  locations: string[];
  selectedCategory: string;
  selectedLocation: string;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
}

const ALL_VALUE = "அனைத்தும்";

export default function MemberFilters({
  categories,
  locations,
  selectedCategory,
  selectedLocation,
  onCategoryChange,
  onLocationChange,
}: MemberFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="category-filter" className="sr-only">
          வகை வடிகட்டி
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="w-full rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 focus:border-primary-400 focus:outline-none"
        >
          <option value={ALL_VALUE}>அனைத்து வகைகளும்</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="location-filter" className="sr-only">
          இடம் வடிகட்டி
        </label>
        <select
          id="location-filter"
          value={selectedLocation}
          onChange={(event) => onLocationChange(event.target.value)}
          className="w-full rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 focus:border-primary-400 focus:outline-none"
        >
          <option value={ALL_VALUE}>அனைத்து இடங்களும்</option>
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
