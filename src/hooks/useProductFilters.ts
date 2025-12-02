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
  const [sortOrder, setSortOrder] = useState<string>("");
  const [priceRange, setPriceRange] = useState<{
    min: number | null;
    max: number | null;
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
      filtered = filtered.filter((product) => {
        const price = product.price!;
        const minValid = priceRange.min === null || price >= priceRange.min;
        const maxValid = priceRange.max === null || price <= priceRange.max;
        return minValid && maxValid;
      });
    }

    if (sortOrder) {
      if (sortOrder === "alphabeticalAsc") {
        filtered.sort((a, b) =>
          a.title!.toLowerCase() > b.title!.toLowerCase() ? 1 : -1
        );
      } else if (sortOrder === "alphabeticalDesc") {
        filtered.sort((a, b) =>
          a.title!.toLowerCase() < b.title!.toLowerCase() ? 1 : -1
        );
      } else if (sortOrder === "menorAmayor") {
        filtered.sort((a, b) => (a.price! < b.price! ? 1 : -1));
      } else if (sortOrder === "mayorAmenor") {
        filtered.sort((a, b) => (a.price! > b.price! ? 1 : -1));
      }
    }

    setProducts(filtered);
  }, [productsBackup, searchQuery, selectedTags, priceRange, sortOrder]);

  const filterBySearch = (query: string) => {
    setSearchQuery(query);
  };

  const filterByPrice = (min: number, max: number) => {
    setPriceRange({
      min: min || null,
      max: max || null,
    });
  };

  const filterByValue = (value: string) => {
    setSortOrder(value);
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
    setSortOrder("");
  };

  const maxPrice = Math.max(...productsBackup.map((p) => p.price), 0);

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
    priceRange,
  };
};
