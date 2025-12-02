import ProductCard from "../components/ProductCard";
import HomeFilters from "../components/HomeFilters";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import { useProductFilters } from "../hooks/useProductFilters";
import { useMemo } from "react";

export default function Home() {
  const {
    products,
    loading,
    error,
    tags,
    maxPrice,
    filterByPrice,
    filterByValue,
    filterByTag,
    filterBySearch,
    resetProducts,
    totalCount,
    hasFilters,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  } = useProductFilters();

  const paginatedProducts = useMemo(() => {
    if (hasFilters) {
      const start = (currentPage - 1) * itemsPerPage;
      return products.slice(start, start + itemsPerPage);
    }
    return products;
  }, [products, currentPage, itemsPerPage, hasFilters]);

  const totalPages = hasFilters
    ? Math.ceil(products.length / itemsPerPage)
    : Math.ceil(totalCount / itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));

  const handleReset = () => {
    resetProducts();
  };

  return (
    <section>
      <div className="bg-gray-100 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-serif font-bold text-gray-900 sm:text-3xl">
            Nuestros Productos
          </h2>
          <p className="mt-4 max-w-md text-gray-500">
            Descubre nuestra selección de vinos premium, quesos artesanales,
            fiambres de autor y productos regionales cuidadosamente
            seleccionados.
          </p>
        </header>

        <SearchBar onSearch={filterBySearch} />

        <HomeFilters
          filterByPrice={filterByPrice}
          resetProducts={handleReset}
          filterByValue={filterByValue}
          tags={tags}
          filterByTag={filterByTag}
          maxPrice={maxPrice}
        />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-center font-bold text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 mt-8">
            No se encontraron coincidencias
          </p>
        ) : (
          <>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
              {paginatedProducts.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={nextPage}
                onPrev={prevPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
