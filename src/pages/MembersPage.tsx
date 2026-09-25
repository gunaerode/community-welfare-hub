import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/common/Icon";
import PageHeader from "../components/common/PageHeader";
import PageMeta from "../components/common/PageMeta";
import MemberFilters, { ALL_VALUE } from "../components/members/MemberFilters";
import MemberGrid from "../components/members/MemberGrid";
import MemberSearch from "../components/members/MemberSearch";
import { pick, pickList, useLanguage } from "../context/LanguageContext";
import { useMembers } from "../services/siteData";

export default function MembersPage() {
  const { lang, t } = useLanguage();
  const { members } = useMembers();
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

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of members) {
      if (!m.category) continue;
      const c = pick(lang, m.category, m.categoryEn);
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    return [...counts.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => a.value.localeCompare(b.value));
  }, [members, lang]);

  const locations = useMemo(
    () =>
      Array.from(
        new Set(members.map((m) => (m.location ? pick(lang, m.location, m.locationEn) : "")).filter(Boolean)),
      ).sort(),
    [members, lang],
  );

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return members.filter((member) => {
      const memberCategory = member.category ? pick(lang, member.category, member.categoryEn) : undefined;
      const memberLocation = member.location ? pick(lang, member.location, member.locationEn) : undefined;
      // Search across names, business, category and services — in both languages.
      const haystack = [
        member.name,
        member.businessName,
        member.category,
        member.categoryEn,
        member.location,
        member.locationEn,
        ...(member.services ? pickList(lang, member.services, member.servicesEn) : []),
        ...(member.services ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = query.length === 0 || haystack.includes(query);
      const matchesCategory = category === ALL_VALUE || memberCategory === category;
      const matchesLocation = location === ALL_VALUE || memberLocation === location;
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [members, search, category, location, lang]);

  const hasFilters = search !== "" || category !== ALL_VALUE || location !== ALL_VALUE;
  const clearFilters = () => {
    setSearch("");
    setCategory(ALL_VALUE);
    setLocation(ALL_VALUE);
  };

  return (
    <>
      <PageMeta title={t.membersPageTitle} description={t.membersPageSubtitle} />
      <PageHeader icon="users" title={t.membersPageTitle} subtitle={t.membersPageSubtitle}>
        <div className="mx-auto max-w-xl">
          <MemberSearch value={search} onChange={setSearch} />
        </div>
      </PageHeader>

      <section className="container-page py-8">
        <MemberFilters
          categories={categories}
          locations={locations}
          selectedCategory={category}
          selectedLocation={location}
          onCategoryChange={setCategory}
          onLocationChange={setLocation}
        />

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-primary-600 dark:text-primary-300" aria-live="polite">
            <span className="font-extrabold text-primary-900 dark:text-white">{filteredMembers.length}</span>{" "}
            {t.membersFoundSuffix}
          </p>
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="btn-ghost btn-sm">
              <Icon name="x" className="h-4 w-4" />
              {t.clearFilters}
            </button>
          )}
        </div>

        <div className="mt-5">
          <MemberGrid
            members={filteredMembers}
            emptyAction={
              hasFilters ? (
                <button type="button" onClick={clearFilters} className="btn-outline btn-sm mt-2">
                  {t.clearFilters}
                </button>
              ) : undefined
            }
          />
        </div>

        <div className="card mt-12 flex flex-col items-center justify-between gap-4 p-6 text-center sm:flex-row sm:text-left" data-reveal>
          <div className="flex items-center gap-4">
            <span className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-accent-100 text-accent-700 sm:flex dark:bg-accent-900/60 dark:text-accent-300">
              <Icon name="store" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-base font-bold text-primary-900 dark:text-white">{t.membersMissingPrompt}</p>
              <p className="text-sm text-primary-600 dark:text-primary-300">{t.ctaBannerText}</p>
            </div>
          </div>
          <Link to="/members/join" className="btn-accent shrink-0">
            <Icon name="userPlus" className="h-5 w-5" />
            {t.navAddDetails}
          </Link>
        </div>
      </section>
    </>
  );
}
