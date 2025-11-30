type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-wood-700 text-white rounded-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-wood-800"
      >
        Anterior
      </button>
      <span className="text-gray-700 font-medium">Página {currentPage} de {totalPages}</span>
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-wood-700 text-white rounded-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-wood-800"
      >
        Siguiente
      </button>
    </div>
  );
}
