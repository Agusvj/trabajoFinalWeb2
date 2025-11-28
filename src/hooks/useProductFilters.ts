import { useState, useEffect } from "react";
import { getProducts } from "../data/products";
import type { Product, Tag, Category } from "../types/entities";

export const useProductFilters = (categoryFilter?: Category) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsBackup, setProductsBackup] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const categoryId = categoryFilter?.id;

      try {
        const data = await getProducts();
        const filteredData = categoryId
          ? data.filter((p) => p.category_id === categoryId)
          : data;

        setProductsBackup(filteredData);
        setProducts(filteredData);

        const productTags = filteredData.map((product) => product.tags).flat();
        const uniqueTags = productTags.filter(
          (tag, index, self) => index === self.findIndex((t) => t.id === tag.id)
        );
        setTags(uniqueTags);
      } catch {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [categoryFilter?.id]);

  const filterBySearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setProducts(productsBackup);
      return;
    }

    const filtered = productsBackup.filter(
      (product) =>
        product.title?.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filtered);
  };

  const filterByPrice = (min: number, max: number) => {
    const filteredProducts = productsBackup.filter(
      (product) => product.price! * 1000 >= min && product.price! * 1000 <= max
    );
    setProducts(filteredProducts);
  };

  const filterByValue = (value: string) => {
    const sortedProducts = [...products];
    if (value === "alphabeticalAsc") {
      sortedProducts.sort((a, b) =>
        a.title!.toLowerCase() > b.title!.toLowerCase() ? 1 : -1
      );
    } else if (value === "alphabeticalDesc") {
      sortedProducts.sort((a, b) =>
        a.title!.toLowerCase() < b.title!.toLowerCase() ? 1 : -1
      );
    } else if (value === "menorAmayor") {
      sortedProducts.sort((a, b) => (a.price! < b.price! ? 1 : -1));
    } else if (value === "mayorAmenor") {
      sortedProducts.sort((a, b) => (a.price! > b.price! ? 1 : -1));
    }
    setProducts(sortedProducts);
  };

  const filterByTag = (tagId: number) => {
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
  };

  const resetProducts = () => {
    setProducts(productsBackup);
    setSelectedTags([]);
    setSearchQuery("");
  };

  return {
    products,
    loading,
    error,
    tags,
    filterByPrice,
    filterByValue,
    filterByTag,
    filterBySearch,
    resetProducts,
  };
};
