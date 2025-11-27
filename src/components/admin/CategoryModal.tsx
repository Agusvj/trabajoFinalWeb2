// src/components/admin/CategoryModal.tsx
import { useState } from "react";
import type { Category } from "../../types/entities";
import {useCategories} from "../../data/crudCategories";

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
  mode: "create" | "edit";
  onSave:(newCategory: Category) =>void;
};

export default function CategoryModal({
  isOpen,
  onClose,
  category,
  mode,
  onSave,
}: CategoryModalProps) {
  const{createCategory, updateCategory } = useCategories();
  const [formData, setFormData] = useState({
    title: category?.title || "",
    description: category?.description || "",
    picture: category?.picture || "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call logic
    const dataToSend = {
      ...formData,
      picture:[formData.picture],
    };
    console.log("Form data:", formData);
    if(mode === "create"){
      const newCategory = await createCategory(dataToSend);
      onSave(newCategory);
     } else{
      const updatedCategory = await updateCategory(category!.id, dataToSend);
     onSave(updatedCategory);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {mode === "create" ? "Agregar Categoría" : "Editar Categoría"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen URL
              </label>
              <input
                type="text"
                value={formData.picture}
                onChange={(e) =>
                  setFormData({ ...formData, picture: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="URL de la imagen"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
              >
                {mode === "create" ? "Crear" : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
