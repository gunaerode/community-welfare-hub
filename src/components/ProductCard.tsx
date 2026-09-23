import { pick, useLanguage } from "../context/LanguageContext";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function ProductCard({ product, quantity, onAdd, onIncrement, onDecrement }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const name = pick(lang, product.name, product.nameEn);
  const description = pick(lang, product.description ?? "", product.descriptionEn);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm dark:border-primary-800 dark:bg-primary-800">
      <div className="aspect-square w-full overflow-hidden bg-primary-50 dark:bg-primary-900">
        {product.image ? (
          <img src={product.image} alt={name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl" aria-hidden="true">
            🛍️
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-sm font-bold text-primary-900 dark:text-white">{name}</h3>
        {description && (
          <p className="text-xs leading-relaxed text-primary-600 dark:text-primary-300">{description}</p>
        )}
        <p className="mt-1 text-base font-extrabold text-primary-700 dark:text-accent-400">₹{product.price}</p>

        <div className="mt-2">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="w-full rounded-full bg-primary-700 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-600"
            >
              {t.addToCart}
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-full border border-primary-200 dark:border-primary-600">
              <button
                type="button"
                onClick={onDecrement}
                aria-label={t.decreaseQuantity}
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-primary-700 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-700"
              >
                −
              </button>
              <span className="text-sm font-bold text-primary-900 dark:text-white">{quantity}</span>
              <button
                type="button"
                onClick={onIncrement}
                aria-label={t.increaseQuantity}
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-primary-700 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-700"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
