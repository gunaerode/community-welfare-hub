import { useMemo, useState } from "react";
import MemberFilters, { ALL_VALUE } from "../components/members/MemberFilters";
import MemberGrid from "../components/members/MemberGrid";
import MemberSearch from "../components/members/MemberSearch";
import PageHeader from "../components/common/PageHeader";
import PageMeta from "../components/common/PageMeta";
import { pick, useLanguage } from "../context/LanguageContext";
import { MEMBERS } from "../data/members";

export default function MembersPage() {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL_VALUE);
  const [location, setLocation] = useState(ALL_VALUE);

  // Category/location option text is localized, so reset selections on language
  // change rather than leaving a stale-language value that would match nothing.
  // (Adjusting state during render, per React's guidance, instead of an effect.)
  const [prevLang, setPrevLang] = useState(lang);
  if (prevLang !== lang) {
    setPrevLang(lang);
    setCategory(ALL_VALUE);
    setLocation(ALL_VALUE);
  }

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          MEMBERS.map((m) => (m.category ? pick(lang, m.category, m.categoryEn) : null)).filter(
            (c): c is string => Boolean(c),
          ),
        ),
      ).sort(),
    [lang],
  );
  const locations = useMemo(
    () =>
      Array.from(
        new Set(
          MEMBERS.map((m) => (m.location ? pick(lang, m.location, m.locationEn) : null)).filter(
            (l): l is string => Boolean(l),
          ),
        ),
      ).sort(),
    [lang],
  );

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return MEMBERS.filter((member) => {
      const memberCategory = member.category ? pick(lang, member.category, member.categoryEn) : undefined;
      const memberLocation = member.location ? pick(lang, member.location, member.locationEn) : undefined;
      const matchesSearch =
        query.length === 0 ||
        member.name.toLowerCase().includes(query) ||
        member.businessName?.toLowerCase().includes(query);
      const matchesCategory = category === ALL_VALUE || memberCategory === category;
      const matchesLocation = location === ALL_VALUE || memberLocation === location;
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [search, category, location, lang]);

  return (
    <>
      <PageMeta title={t.membersPageTitle} description={t.membersPageSubtitle} />
      <PageHeader icon="👨‍👩‍👧‍👦" title={t.membersPageTitle} subtitle={t.membersPageSubtitle} />

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

        <p className="mt-4 text-sm text-primary-500 dark:text-primary-400">
          {filteredMembers.length} {t.membersFoundSuffix}
        </p>

        <div className="mt-4">
          <MemberGrid members={filteredMembers} />
        </div>
      </section>
    </>
  );
}
