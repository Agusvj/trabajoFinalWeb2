import { useState } from "react";

type HomeFiltersProps = {
  filterByPrice: (minPrice: number, maxPrice: number) => void;
  resetProducts: () => void;
  filterByValue: (value: string) => void;
  tags: Array<{ title: string; id: number }>;
  filterByTag: (tagId: number) => void;
};

export default function HomeFilters({
  filterByPrice,
  resetProducts,
  filterByValue,
  tags,
  filterByTag,
}: HomeFiltersProps) {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(600000);
  const [checkedTags, setCheckedTags] = useState<Set<number>>(new Set());

  const handleReset = () => {
    resetProducts();
    setCheckedTags(new Set());
  };

  const handleTagChange = (tagId: number) => {
    const newCheckedTags = new Set(checkedTags);
    if (newCheckedTags.has(tagId)) {
      newCheckedTags.delete(tagId);
    } else {
      newCheckedTags.add(tagId);
    }
    setCheckedTags(newCheckedTags);
    filterByTag(tagId);
  };

  return (
    <div className="mt-8 sm:flex sm:items-center sm:justify-between">
      <div className="block sm:hidden">
        <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
          <span className="text-sm font-medium"> Filters & Sorting </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 rtl:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div className="hidden sm:flex sm:gap-4">
        <div className="relative">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
              <span className="text-sm font-medium"> x Etiqueta </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
              <div className="w-96 rounded-sm border border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                  <button
                    type="button"
                    className="text-sm text-gray-900 underline underline-offset-4"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </header>

                <ul className="space-y-1 border-t border-gray-200 p-4">
                  {tags.map((tag) => (
                    <li key={tag.id}>
                      <label
                        htmlFor="FilterByTags"
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id="FilterByTags"
                          className="size-5 rounded-sm border-gray-300 shadow-sm"
                          checked={checkedTags.has(tag.id)}
                          onChange={() => handleTagChange(tag.id)}
                        />

                        <span className="text-sm font-medium text-gray-700">
                          {" "}
                          {tag.title}{" "}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </div>

        <div className="relative">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
              <span className="text-sm font-medium"> Precio </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
              <div className="w-96 rounded-sm border border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700">
                    {" "}
                    The highest price is $600{" "}
                  </span>

                  <button
                    type="button"
                    className="text-sm text-gray-900 underline underline-offset-4"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </header>

                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between gap-4">
                    <label
                      htmlFor="FilterPriceFrom"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">$</span>

                      <input
                        type="number"
                        id="FilterPriceFrom"
                        placeholder="From"
                        className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                      />
                    </label>

                    <label
                      htmlFor="FilterPriceTo"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">$</span>

                      <input
                        type="number"
                        id="FilterPriceTo"
                        placeholder="To"
                        className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                        onChange={(e) => {
                          setMaxPrice(Number(e.target.value));
                        }}
                      />
                    </label>
                  </div>
                  <button
                    className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden mt-5"
                    onClick={() => filterByPrice(minPrice, maxPrice)}
                  >
                    Filtrar
                  </button>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>

      <div className="hidden sm:block">
        <label htmlFor="SortBy" className="sr-only">
          SortBy
        </label>

        <select
          id="SortBy"
          className="h-10 rounded-sm border-gray-300 text-sm"
          onChange={(e) => {
            const value = e.target.value;
            filterByValue(value);
          }}
        >
          <option>Sort By</option>
          <option value="alphabeticalAsc">Titulo, ASC</option>
          <option value="alphabeticalDesc">Titulo, DESC</option>
          <option value="menorAmayor">Precio, DESC</option>
          <option value="mayorAmenor">Precio, ASC</option>
        </select>
      </div>
    </div>
  );
}
