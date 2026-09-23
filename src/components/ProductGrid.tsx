import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  quantities: Record<string, number>;
  onAdd: (productId: string) => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
}

export default function ProductGrid({ products, quantities, onAdd, onIncrement, onDecrement }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={quantities[product.id] ?? 0}
          onAdd={() => onAdd(product.id)}
          onIncrement={() => onIncrement(product.id)}
          onDecrement={() => onDecrement(product.id)}
        />
      ))}
    </div>
  );
}
