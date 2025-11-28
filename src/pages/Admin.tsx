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

  const {getTags} = useTags();

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Panel de Administración
      </h1>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "products"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Productos ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Categorías ({categories.length})
          </button>

           <button
            onClick={() => setActiveTab("tags")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "tags"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Etiquetas ({tags.length})
          </button>
        </nav>
      </div>

      {activeTab === "products" && (
        <ProductsTable products={products} categories={categories} />
      )}
      {activeTab === "categories" && (
        <CategoriesTable categories={categories} />
      )}
      {activeTab === "tags" && (
        <TagsTable tags={tags} />
      )}
    </div>
  );
}
