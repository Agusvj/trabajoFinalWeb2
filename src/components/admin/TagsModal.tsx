import { useEffect, useState } from "react";
import type { Tag } from "../../types/entities";
import { useTags } from "../../data/crudTags";
import ErrorModal from "./ErrorModal";

export type TagsModalProps =
  | {
      isOpen: boolean;
      onClose: () => void;
      tags?: Tag;
      mode: "create";
      onSave: (newTag: Tag) => void;
    }
  | {
      isOpen: boolean;
      onClose: () => void;
      tags: Tag;
      mode: "edit";
      onSave: (newTag: Tag) => void;
    };

export default function TagsModal({
  isOpen,
  onClose,
  tags,
  mode,
  onSave,
}: TagsModalProps) {
  const { createTag, updateTag } = useTags();
  const [formData, setFormData] = useState({
    title: tags?.title ?? "",
  });
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  useEffect(() => {
    setFormData({
      title: tags?.title ?? "",
    });
  }, [tags, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = { ...formData };

    try {
      if (mode === "create") {
        const newTag = await createTag(dataToSend);
        onSave(newTag, false);
      } else {
        const updatedTag = await updateTag(tags.id, dataToSend);
        onSave(updatedTag, true);
      }
      onClose();
    } catch (error: any) {
      setErrorModal({
        isOpen: true,
        message:
          error.message ||
          `Error al ${mode === "create" ? "crear" : "actualizar"} la etiqueta`,
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {mode === "create" ? "Agregar Etiqueta" : "Editar Etiqueta"}
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
                  required
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
                  className="px-4 py-2 text-sm font-medium text-white bg-stone-700 rounded-md hover:bg-stone-800"
                >
                  {mode === "create" ? "Crear" : "Actualizar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        title={`Error al ${
          mode === "create" ? "crear" : "actualizar"
        } etiqueta`}
        message={errorModal.message}
      />
    </>
  );
}
