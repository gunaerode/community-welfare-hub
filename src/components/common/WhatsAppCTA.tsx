import { WhatsAppGlyph } from "./Icon";

interface WhatsAppCTAProps {
  href: string;
  label: string;
  className?: string;
}

/** Large, prominent WhatsApp call-to-action button used on Contact/member pages. */
export default function WhatsAppCTA({ href, label, className = "" }: WhatsAppCTAProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn-whatsapp py-3.5 ${className}`}>
      <WhatsAppGlyph />
      {label}
    </a>
  );
}
