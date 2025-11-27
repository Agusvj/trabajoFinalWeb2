// src/pages/Home.tsx
import ProductCard from "../components/ProductCard";
import HomeFilters from "../components/HomeFilters";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProductFilters } from "../hooks/useProductFilters";

export default function Home() {
  const {
    products,
    loading,
    error,
    tags,
    filterByPrice,
    filterByValue,
    filterByTag,
    resetProducts,
  } = useProductFilters();

  return (
    <section>
      <div className="bg-gray-100 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Nuestros Productos
          </h2>
          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <HomeFilters
          filterByPrice={filterByPrice}
          resetProducts={resetProducts}
          filterByValue={filterByValue}
          tags={tags}
          filterByTag={filterByTag}
        />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-center font-bold text-red-600">{error}</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
