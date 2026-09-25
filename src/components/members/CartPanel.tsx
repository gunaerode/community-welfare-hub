import { pick, useLanguage } from "../../context/LanguageContext";
import type { Member } from "../../types/member";
import type { CartLine } from "../../types/product";
import { createCartOrderUrl } from "../../utils/whatsapp";
import PrintReceipt from "./PrintReceipt";
import Icon, { WhatsAppGlyph } from "../common/Icon";

interface CartPanelProps {
  member: Member;
  cart: CartLine[];
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  /**
   * When true, renders without its own card background/border/shadow/padding
   * — for embedding inside another already-styled container (e.g. the
   * collapsible fixed bottom cart bar), so it doesn't create a nested box.
   */
  bare?: boolean;
}

export default function CartPanel({ member, cart, onIncrement, onDecrement, onRemove, bare = false }: CartPanelProps) {
  const { lang, t } = useLanguage();
  const total = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <section
      aria-labelledby="cart-heading"
      className={
        bare
          ? ""
          : "card p-5"
      }
    >
      <h2 id="cart-heading" className="flex items-center gap-2 text-base font-bold text-primary-900 dark:text-white">
        <Icon name="cart" className="h-5 w-5 text-accent-600" />
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
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-primary-100 text-left text-xs uppercase tracking-wide text-primary-500 dark:border-primary-700 dark:text-primary-400">
                  <th scope="col" className="pb-2 pr-2 font-semibold">
                    {t.cartItemColumn}
                  </th>
                  <th scope="col" className="pb-2 px-2 text-center font-semibold">
                    {t.cartQtyColumn}
                  </th>
                  <th scope="col" className="pb-2 pl-2 text-right font-semibold">
                    {t.cartAmountColumn}
                  </th>
                  <th scope="col" className="pb-2 pl-1">
                    <span className="sr-only">{t.removeFromCart}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-100 dark:divide-primary-700">
                {cart.map((line) => {
                  const name = pick(lang, line.product.name, line.product.nameEn);
                  return (
                    <tr key={line.product.id}>
                      <td className="py-2.5 pr-2">
                        <p className="font-semibold text-primary-900 dark:text-white">{name}</p>
                        <p className="text-xs text-primary-500 dark:text-primary-400">₹{line.product.price}</p>
                      </td>
                      <td className="py-2.5 px-2">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => onDecrement(line.product.id)}
                            aria-label={t.decreaseQuantity}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-primary-700 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-700"
                          >
                            <Icon name="minus" className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center font-bold text-primary-900 dark:text-white">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrement(line.product.id)}
                            aria-label={t.increaseQuantity}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-primary-700 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-700"
                          >
                            <Icon name="plus" className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 pl-2 text-right font-semibold text-primary-900 dark:text-white">
                        ₹{line.product.price * line.quantity}
                      </td>
                      <td className="py-2.5 pl-1 text-right">
                        <button
                          type="button"
                          onClick={() => onRemove(line.product.id)}
                          aria-label={t.removeFromCart}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-primary-400 hover:bg-red-50 hover:text-red-600 dark:text-primary-500 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                        >
                          <Icon name="trash" className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-primary-100 pt-3 dark:border-primary-700">
            <span className="text-sm font-bold text-primary-900 dark:text-white">{t.cartTotalLabel}</span>
            <span className="text-lg font-extrabold text-primary-700 dark:text-accent-400">₹{total}</span>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={createCartOrderUrl(member, cart, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppGlyph />
              {t.sendOrderWhatsApp}
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-outline"
            >
              <Icon name="printer" />
              {t.printOrder}
            </button>
          </div>

          <PrintReceipt member={member} cart={cart} />
        </>
      )}
    </section>
  );
}
