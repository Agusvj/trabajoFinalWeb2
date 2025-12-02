// src/components/admin/TagsTable.tsx
import { useState, useMemo, useEffect } from "react";
import type { Tag } from "../../types/entities";
import TagsModal from "./TagsModal";
import DeleteModal from "./DeleteModal";
import Pagination from "../Pagination";
import { useTags } from "../../data/crudTags";
import { usePagination } from "../../hooks/usePagination";
import ErrorModal from "./ErrorModal";
import SuccessToast from "./SuccessToast";

type TagsModalState =
  | { isOpen: boolean; mode: "create"; tags?: never }
  | { isOpen: boolean; mode: "edit"; tags: Tag };

type TagsTableProps = {
  tags: Tag[];
  onDataChange: () => void;
};

export default function TagsTable({ tags, onDataChange }: TagsTableProps) {
  const [tagsState, setTagsState] = useState<Tag[]>(tags);

  useEffect(() => {
    setTagsState(tags);
  }, [tags]);
  const [tagsModal, setTagsModal] = useState<TagsModalState>({
    isOpen: false,
    mode: "create",
  });
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [successToast, setSuccessToast] = useState({ isOpen: false, message: "" });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    tags?: Tag;
  }>({ isOpen: false });

  const { deleteTag } = useTags();
  const { currentPage, itemsPerPage, nextPage, prevPage } = usePagination(10);

  const paginatedTags = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return tagsState.slice(start, start + itemsPerPage);
  }, [tagsState, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(tagsState.length / itemsPerPage);

  const handleEdit = (tags: Tag) => {
    setTagsModal({ isOpen: true, mode: "edit", tags: tags });
  };

  const handleDelete = (tags: Tag) => {
    setDeleteModal({ isOpen: true, tags });
  };

  const confirmDelete = async () => {
    try {
      if (!deleteModal.tags) return;
      await deleteTag(deleteModal.tags.id);
      setDeleteModal({ isOpen: false });
      setSuccessToast({ isOpen: true, message: "Etiqueta eliminada exitosamente" });
      setTimeout(() => setSuccessToast({ isOpen: false, message: "" }), 3000);
      await onDataChange();
    } catch (error: any) {
      setDeleteModal({ isOpen: false });
      setErrorModal({
        isOpen: true,
        message: error.message || "Error al eliminar la etiqueta",
      });
    }
  };

  const handleTagSaved = async (newTag: Tag, isEdit: boolean) => {
    setSuccessToast({ 
      isOpen: true, 
      message: isEdit ? "Etiqueta actualizada exitosamente" : "Etiqueta creada exitosamente" 
    });
    setTimeout(() => setSuccessToast({ isOpen: false, message: "" }), 3000);
    await onDataChange();
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Gestión de Etiquetas
          </h2>
          <button
            onClick={() => setTagsModal({ isOpen: true, mode: "create" })}
            className="bg-stone-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-stone-800"
          >
            Agregar Etiqueta
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
                  Nombre
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTags.map((tags) => (
                <tr key={tags.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {tags.id}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {tags.title}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(tags)}
                        className="text-stone-700 hover:text-stone-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(tags)}
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

        {tagsState.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay Etiquetas disponibles</p>
          </div>
        )}

        {tagsState.length > itemsPerPage && (
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

      {tagsModal.mode === "create" ? (
        <TagsModal
          isOpen={tagsModal.isOpen}
          onClose={() => setTagsModal({ isOpen: false, mode: "create" })}
          mode="create"
          onSave={handleTagSaved}
        />
      ) : (
        <TagsModal
          isOpen={tagsModal.isOpen}
          onClose={() => setTagsModal({ isOpen: false, mode: "create" })}
          mode="edit"
          tags={tagsModal.tags}
          onSave={handleTagSaved}
        />
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={confirmDelete}
        title="Eliminar Etiqueta"
        message={`¿Estás seguro de que deseas eliminar "${deleteModal.tags?.title}"? Esta acción no se puede deshacer.`}
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
