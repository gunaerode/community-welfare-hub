import { Link } from "react-router-dom";
import { NAV_LINKS, SITE } from "../constants/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-100 bg-primary-900 text-primary-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <h2 className="text-lg font-bold text-white">{SITE.nameTamil}</h2>
            <p className="mt-1 text-sm text-primary-200">{SITE.nameEnglish}</p>
            <p className="mt-3 text-sm leading-relaxed text-primary-200">{SITE.tagline}</p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-400">
              வழிசெலுத்தல்
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-primary-100 hover:text-accent-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-primary-700 pt-6 text-center text-xs text-primary-300">
          © {year} {SITE.nameTamil}. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
        </div>
      </div>
    </footer>
  );
}
