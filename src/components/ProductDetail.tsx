import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/entities";
import { useCart } from "../hooks/useCart";

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasImages = product.pictures?.length > 0;

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-7xl items-center space-x-2 px-4 sm:px-6 lg:px-8">
            <li>
              <div className="flex items-center">
                <Link
                  to={`/categorias/${product.category_id}`}
                  className="mr-2 text-sm font-medium text-gray-900 hover:underline"
                >
                  {product.category?.title}
                </Link>
                <svg
                  viewBox="0 0 16 20"
                  width="16"
                  height="20"
                  fill="currentColor"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm font-medium text-gray-500">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start">
            <div className="flex flex-col h-full">
              <div className="relative w-full h-[500px] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={
                    hasImages
                      ? `http://161.35.104.211:8000${product.pictures[currentImageIndex]}`
                      : "https://placehold.co/500x500?text=Sin+Imagen"
                  }
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {hasImages && product.pictures.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {product.pictures.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-3 w-3 rounded-full transition-all ${
                        currentImageIndex === index
                          ? "bg-blue-800 w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col h-full justify-between">
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                <p className="text-4xl font-bold text-wood-800 mb-6">
                  ${product.price}
                </p>

                {product.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Etiquetas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="bg-wood-600 px-3 py-1.5 text-xs font-medium text-white rounded-sm"
                        >
                          {tag.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Descripción
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <button
                className="w-full bg-wood-700 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-wood-800 transition-colors focus:outline-none focus:ring-2 focus:ring-wood-500 focus:ring-offset-2 mt-auto"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product, 1);
                }}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
