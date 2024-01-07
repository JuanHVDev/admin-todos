import { ProductCard } from "@/products/components/ProductCard";
import { products } from "@/products/data/products";

export default function ProductPage()
{
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))
      }
    </div>
  );
}