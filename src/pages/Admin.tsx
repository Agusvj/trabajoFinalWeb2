import { useState, useEffect } from "react";
import {
  getProducts,
  getProductsPaginated,
  getProductsCount,
} from "../data/products";
import { getCategories } from "../data/categories";
import { useTags } from "../data/crudTags";
import type { Product, Category, Tag } from "../types/entities";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductsTable from "../components/admin/ProductsTable";
import CategoriesTable from "../components/admin/CategoriesTable";
import TagsTable from "../components/admin/TagsTable";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<
    "products" | "categories" | "tags"
  >("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { getTags } = useTags();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalCategoriesCount, setTotalCategoriesCount] = useState(0);
  const [totalTagsCount, setTotalTagsCount] = useState(0);
  const [hasSearch, setHasSearch] = useState(false);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData, tagsData, count] = await Promise.all(
        [
          getProductsPaginated(0, 10),
          getCategories(),
          getTags(),
          getProductsCount(),
        ]
      );
      setProducts(productsData);
      setAllProducts(productsData);
      setCategories(categoriesData);
      setAllCategories(categoriesData);
      setTags(tagsData);
      setAllTags(tagsData);
      setTotalCount(count);
      setTotalCategoriesCount(categoriesData.length);
      setTotalTagsCount(tagsData.length);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setHasSearch(false);
      async function loadPage() {
        setSearchLoading(true);
        const skip = (currentPage - 1) * 10;
        const [productsData, categoriesData, tagsData] = await Promise.all([
          getProductsPaginated(skip, 10),
          getCategories(),
          getTags(),
        ]);
        setProducts(productsData);
        setAllProducts(productsData);
        setCategories(categoriesData);
        setAllCategories(categoriesData);
        setTags(tagsData);
        setAllTags(tagsData);
        setAllProductsLoaded(false);
        setSearchLoading(false);
      }
      loadPage();
      return;
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const timer = setTimeout(async () => {
      setCurrentPage(1);
      setSearchLoading(true);

      let productsToFilter = allProducts;

      if (!allProductsLoaded) {
        const allData = await getProducts();
        setAllProducts(allData);
        setAllProductsLoaded(true);
        productsToFilter = allData;
      }

      const filteredProds = productsToFilter.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredCats = allCategories.filter(
        (c) =>
          c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredTgs = allTags.filter((t) =>
        t.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setProducts(filteredProds);
      setCategories(filteredCats);
      setTags(filteredTgs);
      setHasSearch(true);
      setSearchLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, allProducts, allCategories, allTags, allProductsLoaded]);

  const filteredProducts = products;
  const filteredCategories = categories;
  const filteredTags = tags;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4 sm:mb-8">
        Panel de Administración
      </h1>

      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar..."
            className="w-full rounded-sm border border-gray-300 px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
          <button
            onClick={() => setActiveTab("products")}
            className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === "products"
                ? "border-wood-700 text-wood-800"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Productos ({hasSearch ? products.length : totalCount})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === "categories"
                ? "border-wood-700 text-wood-800"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Categorías ({hasSearch ? categories.length : totalCategoriesCount})
          </button>

          <button
            onClick={() => setActiveTab("tags")}
            className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === "tags"
                ? "border-wood-700 text-wood-800"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Etiquetas ({hasSearch ? tags.length : totalTagsCount})
          </button>
        </nav>
      </div>

      <div className="relative">
        {searchLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
            <LoadingSpinner />
          </div>
        )}
        {activeTab === "products" && (
          <ProductsTable
            products={filteredProducts}
            categories={categories}
            onDataChange={fetchData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCount={totalCount}
            hasSearch={hasSearch}
          />
        )}
        {activeTab === "categories" && (
          <CategoriesTable
            categories={filteredCategories}
            onDataChange={fetchData}
          />
        )}
        {activeTab === "tags" && (
          <TagsTable tags={filteredTags} onDataChange={fetchData} />
        )}
      </div>
    </div>
  );
}
