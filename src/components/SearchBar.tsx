import { useState, useEffect } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="mt-4 mb-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos por título o descripción..."
          className="w-full rounded-sm border border-gray-300 px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
  );
}
