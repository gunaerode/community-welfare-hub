import { useMemo, useState } from "react";
import MemberFilters, { ALL_VALUE } from "../components/MemberFilters";
import MemberGrid from "../components/MemberGrid";
import MemberSearch from "../components/MemberSearch";
import PageHeader from "../components/PageHeader";
import PageMeta from "../components/PageMeta";
import { MEMBERS } from "../data/members";

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL_VALUE);
  const [location, setLocation] = useState(ALL_VALUE);

  const categories = useMemo(
    () => Array.from(new Set(MEMBERS.map((m) => m.category).filter((c): c is string => Boolean(c)))).sort(),
    [],
  );
  const locations = useMemo(
    () => Array.from(new Set(MEMBERS.map((m) => m.location).filter((l): l is string => Boolean(l)))).sort(),
    [],
  );

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return MEMBERS.filter((member) => {
      const matchesSearch =
        query.length === 0 ||
        member.name.toLowerCase().includes(query) ||
        member.businessName?.toLowerCase().includes(query);
      const matchesCategory = category === ALL_VALUE || member.category === category;
      const matchesLocation = location === ALL_VALUE || member.location === location;
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [search, category, location]);

  return (
    <>
      <PageMeta
        title="உறுப்பினர்கள்"
        description="எங்கள் சங்க உறுப்பினர்களின் தொழில் மற்றும் சேவை விவரங்கள்."
      />
      <PageHeader
        icon="👨‍👩‍👧‍👦"
        title="எங்கள் உறுப்பினர்கள்"
        subtitle="சங்க உறுப்பினர்களின் தொழில் மற்றும் சேவைகளை பார்வையிட்டு நேரடியாக WhatsApp மூலம் தொடர்பு கொள்ளலாம்."
      />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <MemberSearch value={search} onChange={setSearch} />
          <MemberFilters
            categories={categories}
            locations={locations}
            selectedCategory={category}
            selectedLocation={location}
            onCategoryChange={setCategory}
            onLocationChange={setLocation}
          />
        </div>

        <p className="mt-4 text-sm text-primary-500">
          {filteredMembers.length} உறுப்பினர்(கள்) கிடைத்தன
        </p>

        <div className="mt-4">
          <MemberGrid members={filteredMembers} />
        </div>
      </section>
    </>
  );
}
