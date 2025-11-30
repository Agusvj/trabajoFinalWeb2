import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-serif font-bold text-wood-700">404</h1>
        <h2 className="text-3xl font-serif font-semibold text-gray-900 mt-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mt-4 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          to="/"
          className="inline-block bg-wood-700 text-white px-8 py-3 rounded-sm hover:bg-wood-800 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
