import { useState } from "react";

export const usePagination = (itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const resetPage = () => setCurrentPage(1);
  return {
    currentPage,
    itemsPerPage,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  };
};
