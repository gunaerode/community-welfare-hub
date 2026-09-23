import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import type { Member } from "../types/member";
import type { CartLine } from "../types/product";
import CartPanel from "./CartPanel";

interface FixedCartBarProps {
  member: Member;
  cart: CartLine[];
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
}

/**
 * Bottom cart bar shown once the cart has items. Starts collapsed as a thin
 * summary row; clicking it expands the full CartPanel in place. The panel is
 * rendered `bare` so the expanded content shares this bar's single
 * background instead of nesting another card inside it.
 *
 * Uses `position: sticky` (not `fixed`) so it sticks to the bottom of the
 * viewport while scrolling through this page's own content, but releases
 * and scrolls away once its container's end is reached — it never floats
 * over the site Footer, which lives outside this page's content.
 */
export default function FixedCartBar({ member, cart, onIncrement, onDecrement, onRemove }: FixedCartBarProps) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  const total = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="sticky bottom-0 z-30 border-t border-primary-200 bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.15)] dark:border-primary-700 dark:bg-primary-900">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        aria-label={expanded ? t.collapseCart : t.expandCart}
        className="flex w-full items-center justify-between px-4 py-3 sm:px-6"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-primary-900 dark:text-white">
          <span aria-hidden="true">🛒</span>
          {itemCount} {t.cartItemsSuffix}
          <span className="text-primary-300 dark:text-primary-600">•</span>
          <span className="text-primary-700 dark:text-accent-400">₹{total}</span>
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-5 w-5 text-primary-500 transition-transform dark:text-primary-400 ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {expanded && (
        <div className="max-h-[60vh] overflow-y-auto px-4 pb-4 sm:px-6">
          <CartPanel
            bare
            member={member}
            cart={cart}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onRemove={onRemove}
          />
        </div>
      )}
    </div>
  );
}
