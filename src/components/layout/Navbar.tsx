import { useState, useEffect } from "react";
import { getCategories } from "../../data/categories";
import { Link } from "react-router-dom";
import type { Category } from "../../types/entities";
import { useCart } from "../../hooks/useCart";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const { cartItems, toggleCart } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCategories();
        console.log(data);

        setCategories(data);
      } catch (error) {
        console.log(error);
        setError("Error al cargar las categorias");
      }
    }
    fetchData();
  }, []);

  return (
    <header className="flex flex-col dark:bg-gray-900 sticky top-0 z-50">
      <div className="bg-wood-800 h-20 flex mt-auto max-w-full items-center justify-center">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className=" flex h-16  items-center w-full justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link to={`/home/`}>
                <span className="sr-only">Home</span>
                <img src={logo} alt="logo" className="h-16" />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                {categories.length > 3 ? (
                  <div className="relative group">
                    <button className="font-serif font-semibold text-white inline-flex items-center gap-2 transition transform hover:scale-110 hover:text-wood-200">
                      Categorías
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <ul className="py-2">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <Link
                              to={`/categorias/${category.id}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-wood-100 hover:text-wood-800"
                            >
                              {category.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <ul className="flex items-center gap-6 text-sm">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <li key={category.id}>
                          <Link
                            to={`/categorias/${category.id}`}
                            className="font-serif font-semibold text-white inline-block transition transform hover:scale-110 hover:text-wood-200 dark:text-white dark:hover:text-white/75"
                          >
                            {category.title}
                          </Link>
                        </li>
                      ))
                    ) : error ? (
                      <li className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                        {error}
                      </li>
                    ) : (
                      <li className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 font-bold">
                        Cargando...
                      </li>
                    )}
                  </ul>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link to="/admin" className="hidden md:block">
                  <button className="bg-wood-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-wood-700 transition">
                    Admin
                  </button>
                </Link>

                <button className="relative" onClick={toggleCart}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart text-white"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l14 1l-1 7h-13" />
                  </svg>

                  <span className="text-center absolute bottom-0 right-0 z-10 bg-red-600/90 rounded-full h-4 w-4 text-white text-xs flex items-center justify-center">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </button>
              </div>

              <div className="block md:hidden">
                <button
                  className="rounded-sm bg-wood-400 p-2 text-wood-800 transition hover:bg-wood-300"
                  onClick={() => setOpen(!open)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              {
                /* Mobile menu */

                open && (
                  <div className="absolute top-20 left-0 w-full bg-wood-200 dark:bg-wood-600 md:hidden shadow-lg">
                    <nav aria-label="Global">
                      <ul className="flex flex-col items-center gap-3 text-sm">
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <li key={category.id} className="p-2">
                              <Link
                                to={`/categorias/${category.id}`}
                                onClick={() => setOpen(false)}
                                className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                              >
                                {category.title}
                              </Link>
                            </li>
                          ))
                        ) : error ? (
                          <li className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                            {error}
                          </li>
                        ) : (
                          <li className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 font-bold">
                            Cargando...
                          </li>
                        )}
                        <li className="p-2 border-t border-wood-300 w-full text-center">
                          <Link
                            to="/admin"
                            onClick={() => setOpen(false)}
                            className="text-gray-700 font-semibold transition hover:text-gray-900 dark:text-white dark:hover:text-white/75"
                          >
                            Admin
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
