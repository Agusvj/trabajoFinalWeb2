// src/components/admin/CategoriesTable.tsx
import { useState } from "react";
import type { Tag} from "../../types/entities";
import TagsModal from "./TagsModal";
import DeleteModal from "./DeleteModal";
import { useTags } from "../../data/crudTags";
type TagsModalState =
  | { isOpen: boolean; mode: "create"; tags?: never }
  | { isOpen: boolean; mode: "edit"; tags: Tag };
type TagsTableProps = {
  tags: Tag[];
};

export default function TagsTable({ tags }: TagsTableProps) {
  const [tagsState, setTagsState] = useState<Tag[]>(tags)
  const [tagsModal, setTagsModal] = useState<TagsModalState>({
    isOpen: false,
    mode: "create",
  });
 

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
   tags?: Tag;
  }>({ isOpen: false });
  //esta funcion tengo que definirla en crudtags
  const {deleteTag} = useTags();

  const handleEdit = (tags: Tag) => {
    setTagsModal({ isOpen: true, mode: "edit", tags: tags });
  };

  const handleDelete = (tags: Tag) => {
    setDeleteModal({ isOpen: true, tags });
  };

  const confirmDelete = async () => {
    try{
      if(!deleteModal.tags) return;
      await deleteTag(deleteModal.tags.id);
      setTagsState (prev =>
        prev.filter(p => p.id !==deleteModal.tags!.id)
      );
    
    // TODO: API call logic
    console.log("Deleting tag:", deleteModal.tags);
    setDeleteModal({ isOpen: false });
     }catch(error){
      console.error("etiqueta eliminada:", error);
     };
    };
  const handleTagSaved = (newTag: Tag) => {
    setTagsState((prevTags) =>{
      const exists = prevTags.some(p =>p.id === newTag.id);
      if(exists){
        return prevTags.map(p => p.id === newTag.id ? newTag : p );
      }
      return [...prevTags, newTag];
    });
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
              {tagsState.map((tags) => (
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
    </>
  );
}