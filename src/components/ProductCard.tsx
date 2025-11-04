import { Link } from "react-router";
import type { Product } from "../types/entities";


type ProductCardProps = {
  product: Product;
};


export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative block overflow-hidden">
      <img
        src={
          product.pictures?.length > 0
            ? "http://161.35.104.211:8000" + product.pictures[0]
            : "https://placehold.co/400x400?text=Producto+sin+foto"
        }
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        {product.tags.length > 0 ? (
          product.tags?.map((tag) => (
            <span
              key={tag.id}
              className="bg-teal-300 px-3 py-1.5 text-xs font-medium whitespace-nowrap mr-2 rounded-sm"
            >
              {" "}
              {tag.title}{" "}
            </span>
          ))
        ) : (
          <span className="bg-transparent px-3 py-1.5 text-xs font-medium whitespace-nowrap mr-2">
            {" "}
          </span>
        )}

        <Link
          to={`/detalle/${product.id}`}
          className="hover:underline text-gray-900 "
        >
          <p className="mt-4 text-lg font-medium text-gray-900 whitespace-nowrap text-ellipsis overflow-hidden">
            {product.title}
          </p>
        </Link>

        <p className="mt-1.5 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
          {product.description
            ? product.description
            : "Description not available"}
        </p>

        <p className="mt-1.5 text-sm text-gray-700">
          ${product.price ? product.price * 1000 : "Price not available"}
        </p>

        <form className="mt-4">
          <button className="block w-full bg-teal-500 p-4 text-sm font-medium transition hover:scale-105 rounded-sm">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}
