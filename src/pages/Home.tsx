import { useEffect, useState } from "react";
import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import HomeFilters from "../components/HomeFilters";

export default function Home() {
  type Product = {
    category?: object;
    category_id?: number;
    description?: string;
    id?: number;
    pictures: Array<string>;
    price?: number;
    tags: Array<Tag>;
    title?: string;
  };

  type Tag = {
    title: string;
    id: number;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [productsBackup, setProductsBackup] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setProductTags] = useState<Array<Tag>>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProductsBackup(data);
        setProducts(data);
        const productTags = data.map((product) => product.tags).flat();
        const uniqueTags = productTags.filter(
          (tag, index, self) => index === self.findIndex((t) => t.id === tag.id)
        );
        setProductTags(uniqueTags);
      } catch (error) {
        console.log(error);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function filterByPrice(min: number, max: number) {
    const filteredProducts = productsBackup.filter(
      (product) => product.price! * 1000 >= min && product.price! * 1000 <= max
    );

    setProducts(filteredProducts);
  }

  function filterByValue(value: string) {
    const sortedProducts = [...products];
    if (value === "alphabeticalAsc") {
      sortedProducts.sort((a, b) => (a.title! > b.title! ? 1 : -1));
    } else if (value === "alphabeticalDesc") {
      sortedProducts.sort((a, b) => (a.title! < b.title! ? 1 : -1));
    } else if (value === "menorAmayor") {
      sortedProducts.sort((a, b) => (a.price! < b.price! ? 1 : -1));
    } else if (value === "mayorAmenor") {
      sortedProducts.sort((a, b) => (a.price! > b.price! ? 1 : -1));
    }

    setProducts(sortedProducts);
  }

  function filterByTag(tagId: number) {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];

    setSelectedTags(newSelectedTags);

    if (newSelectedTags.length === 0) {
      setProducts(productsBackup);
    } else {
      const filteredProducts = productsBackup.filter((product) =>
        newSelectedTags.some((selectedTagId) =>
          product.tags.some((tag) => tag.id === selectedTagId)
        )
      );
      setProducts(filteredProducts);
    }
  }

  function resetProducts() {
    setProducts(productsBackup);
    setSelectedTags([]);
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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
          <p className="text-center font-bold">Cargando...</p>
        ) : error ? (
          <p className="text-center font-bold text-red-600">{error}</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
