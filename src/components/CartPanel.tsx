import { pick, useLanguage } from "../context/LanguageContext";
import type { Member } from "../types/member";
import type { CartLine } from "../types/product";
import { createCartOrderUrl } from "../utils/whatsapp";
import PrintReceipt from "./PrintReceipt";

interface CartPanelProps {
  member: Member;
  cart: CartLine[];
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export default function CartPanel({ member, cart, onIncrement, onDecrement, onRemove }: CartPanelProps) {
  const { lang, t } = useLanguage();
  const total = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <section
      aria-labelledby="cart-heading"
      className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm dark:border-primary-800 dark:bg-primary-800"
    >
      <h2 id="cart-heading" className="text-base font-bold text-primary-900 dark:text-white">
        {t.cartHeading}
        {itemCount > 0 && (
          <span className="ml-2 text-sm font-medium text-primary-500 dark:text-primary-400">
            ({itemCount} {t.cartItemsSuffix})
          </span>
        )}
      </h2>

      {cart.length === 0 ? (
        <p className="mt-2 text-sm text-primary-500 dark:text-primary-400">{t.cartEmptyMessage}</p>
      ) : (
        <>
          <ul className="mt-3 flex flex-col divide-y divide-primary-100 dark:divide-primary-700">
            {cart.map((line) => {
              const name = pick(lang, line.product.name, line.product.nameEn);
              return (
                <li key={line.product.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-primary-900 dark:text-white">{name}</p>
                    <p className="text-xs text-primary-500 dark:text-primary-400">
                      ₹{line.product.price} × {line.quantity} = ₹{line.product.price * line.quantity}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onDecrement(line.product.id)}
                      aria-label={t.decreaseQuantity}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-primary-700 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-700"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-primary-900 dark:text-white">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onIncrement(line.product.id)}
                      aria-label={t.increaseQuantity}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-primary-700 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-700"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(line.product.id)}
                      aria-label={t.removeFromCart}
                      className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-primary-400 hover:bg-red-50 hover:text-red-600 dark:text-primary-500 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                    >
                      🗑
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex items-center justify-between border-t border-primary-100 pt-3 dark:border-primary-700">
            <span className="text-sm font-bold text-primary-900 dark:text-white">{t.cartTotalLabel}</span>
            <span className="text-lg font-extrabold text-primary-700 dark:text-accent-400">₹{total}</span>
          </div>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <a
              href={createCartOrderUrl(member, cart, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              {t.sendOrderWhatsApp}
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary-700 px-5 py-2.5 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-50 dark:text-primary-200 dark:hover:bg-primary-700"
            >
              {t.printOrder}
            </button>
          </div>

          <PrintReceipt member={member} cart={cart} />
        </>
      )}
    </section>
  );
}
