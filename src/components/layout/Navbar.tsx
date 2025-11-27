import { useState, useEffect } from "react";
import { getCategories } from "../../data/categories";
import { Link } from "react-router-dom";
import type { Category } from "../../types/entities";
import { useCart } from "../../hooks/useCart";
import marketsur from "../../assets/marketsur.png";



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
       <div className="bg-gradient-to-b from-[hsl(210,68%,33%)] via-[hsl(210,47%,42%)] to-[hsl(202,53%,48%)] flex h-12 mt-0  w-full justify-end items-end px-8 text-gray-200  text-base">
        <span className="inline-flex items-center text-lg text-white"> Ushuaia  
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
              </svg> 
         </span>
      </div>
      <div className="bg-[hsl(210,71%,31%)] h-16flex flex-col mt-auto max-w-full">
       <div className=" mx-auto w-full mt-auto  px-4 sm:px-6 lg:px-8">
         <div className=" flex h-16  items-center w-full justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link
              to={`/home/`}
              
             >
              <span className="sr-only">Home</span>
              <img src={marketsur} alt="logo" className="h-20" />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/categorias/${category.id}`}
                        className=" font-semibold text-white inline-block transition  transform hover:scale-110 hover:text-gray-50 dark:text-white dark:hover:text-white/75"
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
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
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
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </button>
            </div>

            <div className="block md:hidden">
              <button
                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
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
                <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 md:hidden">
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
