// src/components/ProductList.tsx
import { useMemo } from "react";
import type { Category } from "../types/entities";
import ProductCard from "./ProductCard";
import HomeFilters from "./HomeFilters";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import { useProductFilters } from "../hooks/useProductFilters";
import { usePagination } from "../hooks/usePagination";

type ProductListCategory = {
  category: Category;
};

export default function ProductList({ category }: ProductListCategory) {
  const {
    products,
    loading,
    tags,
    maxPrice,
    filterByPrice,
    filterByValue,
    filterByTag,
    filterBySearch,
    resetProducts,
  } = useProductFilters(category);

  const { currentPage, itemsPerPage, nextPage, prevPage, resetPage } =
    usePagination(10);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleReset = () => {
    resetProducts();
    resetPage();
  };

  if (loading) return <LoadingSpinner />;
  if (products.length === 0) return <p>No hay productos en esta categoría</p>;

  return (
    <div className="bg-gray-100 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h2 className="text-xl font-serif font-bold text-gray-900 sm:text-3xl">
        {category.title}
      </h2>

      <SearchBar onSearch={filterBySearch} />

      <HomeFilters
        filterByPrice={filterByPrice}
        resetProducts={handleReset}
        filterByValue={filterByValue}
        tags={tags}
        filterByTag={filterByTag}
        maxPrice={maxPrice}
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={nextPage}
          onPrev={prevPage}
        />
      )}
    </div>
  );
}
