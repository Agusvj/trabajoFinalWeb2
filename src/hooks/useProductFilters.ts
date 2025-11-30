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
  const [priceRange, setPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);

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

  useEffect(() => {
    let filtered = [...productsBackup];

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((product) =>
        selectedTags.some((selectedTagId) =>
          product.tags.some((tag) => tag.id === selectedTagId)
        )
      );
    }

    if (priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.price! * 1000 >= priceRange.min &&
          product.price! * 1000 <= priceRange.max
      );
    }

    setProducts(filtered);
  }, [productsBackup, searchQuery, selectedTags, priceRange]);

  const filterBySearch = (query: string) => {
    setSearchQuery(query);
  };

  const filterByPrice = (min: number, max: number) => {
    setPriceRange({ min, max });
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
  };

  const resetProducts = () => {
    setProducts(productsBackup);
    setSelectedTags([]);
    setSearchQuery("");
    setPriceRange(null);
  };

  const maxPrice = Math.max(...productsBackup.map((p) => p.price * 1000), 0);

  return {
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
  };
};
