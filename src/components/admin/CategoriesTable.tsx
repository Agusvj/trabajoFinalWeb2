// src/components/admin/CategoriesTable.tsx
import { useState, useMemo, useEffect } from "react";
import type { Category } from "../../types/entities";
import CategoryModal from "./CategoryModal";
import DeleteModal from "./DeleteModal";
import Pagination from "../Pagination";
import { useCategories } from "../../data/crudCategories";
import { usePagination } from "../../hooks/usePagination";
import ErrorModal from "./ErrorModal";
import SuccessToast from "./SuccessToast";

type CategoriesTableProps = {
  categories: Category[];
  onDataChange: () => void;
};

export default function CategoriesTable({ categories, onDataChange }: CategoriesTableProps) {
  const [categoryState, setCategoryState] = useState<Category[]>(categories);

  useEffect(() => {
    setCategoryState(categories);
  }, [categories]);
  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    category?: Category;
  }>({ isOpen: false, mode: "create" });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    category?: Category;
  }>({ isOpen: false });
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [successToast, setSuccessToast] = useState({ isOpen: false, message: "" });

  const { deleteCategory } = useCategories();
  const { currentPage, itemsPerPage, nextPage, prevPage } = usePagination(10);

  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return categoryState.slice(start, start + itemsPerPage);
  }, [categoryState, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(categoryState.length / itemsPerPage);

  const handleEdit = (category: Category) => {
    setCategoryModal({ isOpen: true, mode: "edit", category });
  };

  const handleDelete = (category: Category) => {
    setDeleteModal({ isOpen: true, category });
  };

  const confirmDelete = async () => {
    try {
      if (!deleteModal.category) return;
      await deleteCategory(deleteModal.category.id);
      setDeleteModal({ isOpen: false });
      setSuccessToast({ isOpen: true, message: "Categoría eliminada exitosamente" });
      setTimeout(() => setSuccessToast({ isOpen: false, message: "" }), 3000);
      await onDataChange();
    } catch (error: any) {
      setDeleteModal({ isOpen: false });
      setErrorModal({
        isOpen: true,
        message: error.message || "Error al eliminar la categoría",
      });
    }
  };

  const handleCategorySaved = async (newCategory: Category, isEdit: boolean) => {
    setSuccessToast({ 
      isOpen: true, 
      message: isEdit ? "Categoría actualizada exitosamente" : "Categoría creada exitosamente" 
    });
    setTimeout(() => setSuccessToast({ isOpen: false, message: "" }), 3000);
    await onDataChange();
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Gestión de Categorías
          </h2>
          <button
            onClick={() => setCategoryModal({ isOpen: true, mode: "create" })}
            className="bg-stone-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-stone-800"
          >
            Agregar Categoría
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={
                        category.picture
                          ? `http://161.35.104.211:8000${category.picture}`
                          : "https://placehold.co/60x60?text=No+Image"
                      }
                      alt={category.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md truncate">
                      {category.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-stone-700 hover:text-stone-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(category)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {categoryState.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay categorías disponibles</p>
          </div>
        )}

        {categoryState.length > itemsPerPage && (
          <div className="px-6 py-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={nextPage}
              onPrev={prevPage}
            />
          </div>
        )}
      </div>

      <CategoryModal
        isOpen={categoryModal.isOpen}
        onClose={() => setCategoryModal({ isOpen: false, mode: "create" })}
        category={categoryModal.category}
        mode={categoryModal.mode}
        onSave={handleCategorySaved}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={confirmDelete}
        title="Eliminar Categoría"
        message={`¿Estás seguro de que deseas eliminar "${deleteModal.category?.title}"? Esta acción no se puede deshacer.`}
      />

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        title="Error al eliminar"
        message={errorModal.message}
      />

      <SuccessToast isOpen={successToast.isOpen} message={successToast.message} />
    </>
  );
}
