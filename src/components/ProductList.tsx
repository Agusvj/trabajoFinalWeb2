// src/components/ProductList.tsx
import type { Category } from "../types/entities";
import ProductCard from "./ProductCard";
import HomeFilters from "./HomeFilters";
import LoadingSpinner from "./LoadingSpinner";
import { useProductFilters } from "../hooks/useProductFilters";

type ProductListCategory = {
  category: Category;
};

export default function ProductList({ category }: ProductListCategory) {
  const {
    products,
    loading,
    tags,
    filterByPrice,
    filterByValue,
    filterByTag,
    resetProducts,
  } = useProductFilters(category);

  if (loading) return <LoadingSpinner />;
  if (products.length === 0) return <p>No hay productos en esta categoría</p>;

  return (
    <div className="bg-gray-100 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
        {category.title}
      </h2>

      <HomeFilters
        filterByPrice={filterByPrice}
        resetProducts={resetProducts}
        filterByValue={filterByValue}
        tags={tags}
        filterByTag={filterByTag}
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
