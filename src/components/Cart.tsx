import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Cart() {
  const {
    isOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? "opacity-30" : "opacity-0"
        }`}
        onClick={closeCart}
      />

      <div
        className={`fixed w-[95%] lg:w-screen lg:max-w-sm border border-gray-600 bg-gray-300 px-4 py-8 sm:px-6 lg:px-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-10 top-[130px] transition-all duration-300 transform ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
      >
        <button
          className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
          onClick={closeCart}
        >
          <span className="sr-only">Close cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mt-4 space-y-6">
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {cartItems.length >= 1 ? (
              cartItems.map((item) => (
                <li className="flex items-center gap-4" key={item.product.id}>
                  <img
                    src={
                      item.product.pictures?.length > 0
                        ? `http://161.35.104.211:8000${item.product.pictures[0]}`
                        : "https://placehold.co/64x64?text=Sin+Imagen"
                    }
                    alt={item.product.title}
                    className="size-16 rounded-sm object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900 truncate max-w-[80px]">
                      {item.product.title}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">
                          Precio x Un. : {item.product.price * 1000}
                        </dt>
                      </div>

                      <div>
                        <dt className="inline">
                          Precio Total:{" "}
                          {item.product.price * 1000 * item.quantity}
                        </dt>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <div>
                        <label htmlFor="Quantity" className="sr-only">
                          {" "}
                          Quantity{" "}
                        </label>

                        <div className="flex items-center rounded-sm border border-gray-200">
                          <button
                            type="button"
                            className="size-6 leading-6 text-gray-600 transition hover:opacity-75"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            −
                          </button>

                          <input
                            type="number"
                            id="Quantity"
                            value={item.quantity}
                            className="h-8 w-10 border-transparent text-center [-moz-appearance:textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />

                          <button
                            type="button"
                            className="size-6 leading-6 text-gray-600 transition hover:opacity-75"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </form>

                    <button
                      className="text-gray-600 transition hover:text-red-600 mr-1"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <span className="sr-only">Remove item</span>

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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center">Aun no hay productos</li>
            )}
          </ul>

          <div className="space-y-4 text-center">
            {cartItems.length >= 1 && (
              <div className="text-center py-2 border-t border-gray-300">
                <p className="text-sm text-gray-600 whitespace-nowrap">
                  Cant. Productos:{" "}
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </p>
                <p className="text-lg font-bold text-gray-900 whitespace-nowrap">
                  Total: ${getCartTotal() * 1000}
                </p>
              </div>
            )}

            {cartItems.length >= 1 ? (
              <button
                onClick={() => clearCart()}
                className="block rounded-sm bg-red-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 w-full"
              >
                Borrar carrito
              </button>
            ) : null}

            <Link
              to="/checkout"
              onClick={closeCart}
              className="block rounded-sm bg-wood-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-wood-800"
            >
              Checkout
            </Link>

            <button
              onClick={closeCart}
              className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
