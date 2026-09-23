import PageHeader from "../components/PageHeader";
import PageMeta from "../components/PageMeta";
import WhatsAppCTA from "../components/WhatsAppCTA";
import { ASSOCIATION_ADDRESS, CONTACT_PEOPLE } from "../data/community";
import { createGeneralWhatsAppUrl, createWhatsAppUrl } from "../utils/whatsapp";
import { SITE } from "../constants/site";

export default function ContactPage() {
  return (
    <>
      <PageMeta
        title="தொடர்பு கொள்ள"
        description="சங்கத்தின் Admin, Treasurer மற்றும் பொது விசாரணைக்கான தொடர்பு விவரங்கள்."
      />
      <PageHeader
        icon="📞"
        title="தொடர்பு கொள்ள"
        subtitle={`${SITE.nameTamil} தொடர்பான கேள்விகளுக்கு எங்களை WhatsApp மூலம் அணுகவும்.`}
      />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-primary-900">பொது விசாரணை</h2>
          <p className="mt-2 text-sm text-primary-600">
            சங்கம் தொடர்பான எந்த கேள்விக்கும் நேரடியாக WhatsApp மூலம் தொடர்பு கொள்ளுங்கள்.
          </p>
          <WhatsAppCTA href={createGeneralWhatsAppUrl()} label="WhatsApp மூலம் தொடர்பு கொள்ள" className="mt-5" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CONTACT_PEOPLE.map((person) => (
            <div
              key={person.phone}
              className="flex flex-col gap-2 rounded-2xl border border-primary-100 bg-white p-5 shadow-sm"
            >
              <span className="w-fit rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                {person.role}
              </span>
              <h3 className="text-base font-bold text-primary-900">{person.name}</h3>
              <a
                href={createWhatsAppUrl(
                  person.phone,
                  `வணக்கம் ${person.name},\n\n${SITE.nameTamil} தொடர்பாக ஒரு விசாரணை உள்ளது.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-accent-600"
              >
                📱 WhatsApp அனுப்ப
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-primary-100 bg-primary-50 p-5 text-center">
          <h3 className="text-sm font-bold uppercase tracking-wide text-primary-600">முகவரி</h3>
          <p className="mt-1 text-sm text-primary-800">{ASSOCIATION_ADDRESS}</p>
        </div>
      </section>
    </>
  );
}
