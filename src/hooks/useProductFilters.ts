import { useState, useEffect } from "react";
import { getProducts, getProductsPaginated, getProductsCount } from "../data/products";
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
  const [totalCount, setTotalCount] = useState(0);
  const [hasFilters, setHasFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      const categoryId = categoryFilter?.id;

      try {
        const count = await getProductsCount(categoryId);
        setTotalCount(count);

        const allProducts = await getProducts();
        const filteredForTags = categoryId ? allProducts.filter(p => p.category_id === categoryId) : allProducts;
        const productTags = filteredForTags.map((product) => product.tags).flat();
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
    const isFiltering = searchQuery.trim() || selectedTags.length > 0 || priceRange || sortOrder;
    setHasFilters(!!isFiltering);

    if (!isFiltering) {
      async function loadPage() {
        setLoading(true);
        const skip = (currentPage - 1) * itemsPerPage;
        const paginatedData = await getProductsPaginated(skip, itemsPerPage, categoryFilter?.id);
        setProducts(paginatedData);
        setProductsBackup(paginatedData);
        setLoading(false);
      }
      loadPage();
      return;
    }
  }, [currentPage, categoryFilter?.id, searchQuery, selectedTags, priceRange, sortOrder]);

  useEffect(() => {
    const isFiltering = searchQuery.trim() || selectedTags.length > 0 || priceRange || sortOrder;
    if (!isFiltering) return;

    async function applyFilters() {
      setCurrentPage(1);
      setLoading(true);
      const categoryId = categoryFilter?.id;
      const allProducts = await getProducts();
      let filtered = categoryId ? allProducts.filter(p => p.category_id === categoryId) : allProducts;

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
          filtered.sort((a, b) => a.title!.toLowerCase() > b.title!.toLowerCase() ? 1 : -1);
        } else if (sortOrder === "alphabeticalDesc") {
          filtered.sort((a, b) => a.title!.toLowerCase() < b.title!.toLowerCase() ? 1 : -1);
        } else if (sortOrder === "menorAmayor") {
          filtered.sort((a, b) => a.price! < b.price! ? 1 : -1);
        } else if (sortOrder === "mayorAmenor") {
          filtered.sort((a, b) => a.price! > b.price! ? 1 : -1);
        }
      }

      setProducts(filtered);
      setLoading(false);
    }

    applyFilters();
  }, [searchQuery, selectedTags, priceRange, sortOrder, productsBackup, categoryFilter?.id]);

  const filterBySearch = (query: string) => setSearchQuery(query);
  const filterByPrice = (min: number, max: number) => setPriceRange({ min: min || null, max: max || null });
  const filterByValue = (value: string) => setSortOrder(value);
  const filterByTag = (tagId: number) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];
    setSelectedTags(newSelectedTags);
  };

  const resetProducts = () => {
    setSelectedTags([]);
    setSearchQuery("");
    setPriceRange(null);
    setSortOrder("");
    setCurrentPage(1);
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
    totalCount,
    hasFilters,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  };
};
