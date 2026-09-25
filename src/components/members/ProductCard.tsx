import { pick, useLanguage } from "../../context/LanguageContext";
import type { Product } from "../../types/product";
import Icon from "../common/Icon";
import SafeImage from "../common/SafeImage";

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
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift dark:border-primary-800 dark:bg-primary-950/40">
      <div className="aspect-square w-full overflow-hidden bg-primary-50 dark:bg-primary-900">
        <SafeImage
          src={product.image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          fallback={
            <div className="flex h-full w-full items-center justify-center text-primary-300" aria-hidden="true">
              <Icon name="image" className="h-12 w-12" />
            </div>
          }
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-sm font-bold text-primary-900 sm:text-base dark:text-white">{name}</h3>
        {description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-primary-600 sm:text-sm dark:text-primary-300">{description}</p>
        )}
        <p className="mt-1 text-lg font-extrabold text-primary-700 dark:text-accent-400">₹{product.price}</p>

        <div className="mt-auto pt-2">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="btn-primary btn-sm w-full py-2.5"
            >
              <Icon name="plus" className="h-4 w-4" />
              {t.addToCart}
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-full bg-primary-50 p-0.5 dark:bg-primary-800">
              <button
                type="button"
                onClick={onDecrement}
                aria-label={t.decreaseQuantity}
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-primary-700 hover:bg-white dark:text-primary-100 dark:hover:bg-primary-700"
              >
                <Icon name="minus" className="h-4 w-4" />
              </button>
              <span className="text-base font-bold text-primary-900 dark:text-white">{quantity}</span>
              <button
                type="button"
                onClick={onIncrement}
                aria-label={t.increaseQuantity}
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-primary-700 hover:bg-white dark:text-primary-100 dark:hover:bg-primary-700"
              >
                <Icon name="plus" className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
