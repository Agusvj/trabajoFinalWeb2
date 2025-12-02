// src/pages/Admin.tsx
import { useState, useEffect } from "react";
import { getProducts } from "../data/products";
import { getCategories } from "../data/categories";
import {useTags} from "../data/crudTags";
import type { Product, Category, Tag } from "../types/entities";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductsTable from "../components/admin/ProductsTable";
import CategoriesTable from "../components/admin/CategoriesTable";
import TagsTable from "../components/admin/TagsTable";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "tags">(
    "products"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const {getTags} = useTags();

  const fetchData = async () => {
    try {
      const [productsData, categoriesData, tagsData] = await Promise.all([
        getProducts(),
        getCategories(),
        getTags(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setTags(tagsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(
    (c) =>
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTags = tags.filter((t) =>
    t.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
        Panel de Administración
      </h1>

      <div className="mb-6">
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

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "products"
                ? "border-wood-700 text-wood-800"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Productos ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-wood-700 text-wood-800"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Categorías ({categories.length})
          </button>

           <button
            onClick={() => setActiveTab("tags")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "tags"
                ? "border-wood-700 text-wood-800"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Etiquetas ({tags.length})
          </button>
        </nav>
      </div>

      {activeTab === "products" && (
        <ProductsTable products={filteredProducts} categories={categories} onDataChange={fetchData} />
      )}
      {activeTab === "categories" && (
        <CategoriesTable categories={filteredCategories} onDataChange={fetchData} />
      )}
      {activeTab === "tags" && (
        <TagsTable tags={filteredTags} onDataChange={fetchData} />
      )}
    </div>
  );
}
