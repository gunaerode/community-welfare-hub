import PageHeader from "../components/PageHeader";
import PageMeta from "../components/PageMeta";
import RulesSection from "../components/RulesSection";
import { RULES_SECTIONS } from "../data/community";

export default function RulesPage() {
  return (
    <>
      <PageMeta
        title="விதிமுறைகள்"
        description="சங்கத்தின் மாதாந்திர சந்தா, உதவி/கடன் வரம்பு மற்றும் பிற விதிமுறைகள்."
      />
      <PageHeader
        icon="📜"
        title="விதிமுறைகள் & நடைமுறைகள்"
        subtitle="அனைத்து உறுப்பினர்களும் கீழ்கண்ட விதிமுறைகளை கடைபிடிக்குமாறு கேட்டுக்கொள்கிறோம்."
      />

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {RULES_SECTIONS.map((section) => (
            <RulesSection key={section.id} section={section} />
          ))}
        </div>
      </section>
    </>
  );
}
