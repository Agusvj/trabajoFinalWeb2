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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
        >
          <span className="text-sm font-medium"> Filters & Sorting </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-4 transition-transform ${
              mobileMenuOpen ? "rotate-90" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {mobileMenuOpen && (
          <div className="mt-4 space-y-4 bg-white p-4 rounded-sm border border-gray-200">
            <div>
              <h3 className="text-sm font-medium mb-2">Etiquetas</h3>
              <ul className="space-y-2">
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="size-5 rounded-sm border-gray-300"
                        checked={checkedTags.has(tag.id)}
                        onChange={() => handleTagChange(tag.id)}
                      />
                      <span className="text-sm text-gray-700">{tag.title}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Precio</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Desde"
                  className="w-full rounded-md border-gray-200 text-sm p-2"
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <input
                  type="number"
                  placeholder="Hasta"
                  className="w-full rounded-md border-gray-200 text-sm p-2"
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
              <button
                className="w-full rounded-sm bg-wood-600 px-4 py-2 text-sm text-white hover:bg-wood-700"
                onClick={() => filterByPrice(minPrice, maxPrice)}
              >
                Filtrar
              </button>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Ordenar</h3>
              <select
                className="w-full rounded-sm border-gray-300 text-sm p-2"
                onChange={(e) => filterByValue(e.target.value)}
              >
                <option>Sort By</option>
                <option value="alphabeticalAsc">Titulo, ASC</option>
                <option value="alphabeticalDesc">Titulo, DESC</option>
                <option value="menorAmayor">Precio, DESC</option>
                <option value="mayorAmenor">Precio, ASC</option>
              </select>
            </div>

            <button
              onClick={handleReset}
              className="w-full text-sm text-gray-900 underline"
            >
              Reset
            </button>
          </div>
        )}
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
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="size-5 rounded-sm border-gray-300 shadow-sm"
                          checked={checkedTags.has(tag.id)}
                          onChange={() => handleTagChange(tag.id)}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {tag.title}
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
                    The highest price is $600
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
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                      />
                    </label>
                  </div>
                  <button
                    className="inline-block rounded-sm border border-wood-600 bg-wood-600 px-12 py-3 text-sm font-medium text-white hover:bg-wood-700 focus:ring-3 focus:outline-hidden mt-5"
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
          onChange={(e) => filterByValue(e.target.value)}
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
