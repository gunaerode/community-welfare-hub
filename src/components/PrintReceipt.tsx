import { createPortal } from "react-dom";
import { pick, useLanguage } from "../context/LanguageContext";
import { SITE } from "../constants/site";
import type { CartLine } from "../types/product";
import type { Member } from "../types/member";

interface PrintReceiptProps {
  member: Member;
  cart: CartLine[];
}

/**
 * Print-only order receipt, rendered via a portal directly into document.body
 * so it sits outside the normal page tree (which is hidden with `print:hidden`
 * on Header/main/Footer). Invisible on screen; shown only in the print stylesheet.
 */
export default function PrintReceipt({ member, cart }: PrintReceiptProps) {
  const { lang, t } = useLanguage();
  const total = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const associationName = pick(lang, SITE.nameTamil, SITE.nameEnglish);

  return createPortal(
    <div className="hidden print:block print:p-8">
      <h1 className="text-xl font-bold">{t.orderSummaryTitle}</h1>
      <p className="mt-1 text-sm">{associationName}</p>
      <p className="mt-4 text-sm font-semibold">{member.businessName ?? member.name}</p>
      <p className="text-xs">
        {t.orderDateLabel}: {new Date().toLocaleDateString(lang === "ta" ? "ta-IN" : "en-IN")}
      </p>

      <table className="mt-4 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-black text-left">
            <th className="py-1">{t.cartItemColumn}</th>
            <th className="py-1 text-center">{t.cartQtyColumn}</th>
            <th className="py-1 text-right">{t.cartAmountColumn}</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((line) => (
            <tr key={line.product.id} className="border-b border-gray-300">
              <td className="py-1.5">
                {pick(lang, line.product.name, line.product.nameEn)}
                <span className="ml-1 text-xs text-gray-600">(₹{line.product.price})</span>
              </td>
              <td className="py-1.5 text-center">{line.quantity}</td>
              <td className="py-1.5 text-right">₹{line.product.price * line.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 text-right text-base font-bold">
        {t.cartTotalLabel}: ₹{total}
      </p>
    </div>,
    document.body,
  );
}
