import { Link } from "react-router-dom";
import { SITE } from "../constants/site";
import { createGeneralWhatsAppUrl } from "../utils/whatsapp";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="rounded-full bg-accent-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-700">
          {SITE.nameEnglish}
        </span>

        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-primary-900 sm:text-4xl md:text-5xl">
          {SITE.nameTamil}
        </h1>

        <p className="text-lg font-semibold text-accent-600 sm:text-xl">{SITE.tagline}</p>

        <p className="max-w-2xl text-base leading-relaxed text-primary-700 sm:text-lg">
          {SITE.description}
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/members"
            className="rounded-full bg-primary-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary-700/20 transition-transform hover:scale-[1.02] hover:bg-primary-600 sm:text-base"
          >
            எங்கள் உறுப்பினர்கள்
          </Link>
          <Link
            to="/rules"
            className="rounded-full border-2 border-primary-700 px-6 py-3 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-50 sm:text-base"
          >
            விதிமுறைகளை பார்க்க
          </Link>
          <a
            href={createGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#25D366]/25 transition-transform hover:scale-[1.02] sm:text-base"
          >
            WhatsApp மூலம் தொடர்பு கொள்ள
          </a>
        </div>
      </div>
    </section>
  );
}
