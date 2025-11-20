// src/components/admin/CategoriesTable.tsx
import { useState } from "react";
import type { Category } from "../../types/entities";
import CategoryModal from "./CategoryModal";
import DeleteModal from "./DeleteModal";

type CategoriesTableProps = {
  categories: Category[];
};

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    category?: Category;
  }>({ isOpen: false, mode: "create" });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    category?: Category;
  }>({ isOpen: false });

  const handleEdit = (category: Category) => {
    setCategoryModal({ isOpen: true, mode: "edit", category });
  };

  const handleDelete = (category: Category) => {
    setDeleteModal({ isOpen: true, category });
  };

  const confirmDelete = () => {
    // TODO: API call logic
    console.log("Deleting category:", deleteModal.category);
    setDeleteModal({ isOpen: false });
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
            className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700"
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
              {categories.map((category) => (
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
                        className="text-teal-600 hover:text-teal-900"
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

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay categorías disponibles</p>
          </div>
        )}
      </div>

      <CategoryModal
        isOpen={categoryModal.isOpen}
        onClose={() => setCategoryModal({ isOpen: false, mode: "create" })}
        category={categoryModal.category}
        mode={categoryModal.mode}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={confirmDelete}
        title="Eliminar Categoría"
        message={`¿Estás seguro de que deseas eliminar "${deleteModal.category?.title}"? Esta acción no se puede deshacer.`}
      />
    </>
  );
}
