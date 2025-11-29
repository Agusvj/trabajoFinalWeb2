// src/components/admin/ProductModal.tsx
import { useEffect, useState } from "react";
import type { Product, Category, Tag } from "../../types/entities";
import {  useProducts} from "../../data/crudProduct"; 
import {useTags} from "../../data/crudTags";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  categories: Category[];
  mode: "create" | "edit";
  onSave:(newProduct: Product) => void;
};

type FormDataType = {
  title: string;
  description: string;
  price: number;
  category_id: number | ""; 
};

export default function ProductModal({
  isOpen,
  onClose,
  product,
  categories,
  mode,
  onSave,
}: ProductModalProps) {

  const{ createProduct, updateProduct, uploadProductImage } = useProducts();
  const {getTags} = useTags();

  const [formData, setFormData] = useState<FormDataType>({
    title: product?.title ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    category_id: product?.category_id ?? "",
  });
  const [imageFile, setImageFile] = useState <File | null> (null);

  const[selectedTags, setSelectedTags] = useState<number[]>([]);

  const[availableTags, setAvailableTags] = useState<Tag[]>([]);

  const [showTagDropdown, setShowTagDropdown] = useState(false);

    const handleTagToggle = (tagId: number) => {
      setSelectedTags((prev) =>
        prev.includes(tagId)
          ? prev.filter((id) => id !== tagId)
          : [...prev, tagId]
      );
    };

    useEffect(() =>{
      setFormData({
        title: product?.title ??"",
        description:product?.description ??"",
        price:product?.price?? 0,
        category_id: product?.category_id ??"",

      });
      setSelectedTags(product?.tags?.map((t) => t.id) ?? []);
      setImageFile(null);
    }, [product, isOpen]);

    useEffect(() =>{
      getTags()
      .then(setAvailableTags)
      .catch((err) => console.error("Error cargando tags", err));

    }, []);
  
  
  if (!isOpen) return null;

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call logic
    const dataToSend = {
      ...formData,
      category_id : Number(formData.category_id),
      tag_ids: selectedTags,
       };
    console.log("Form data:", formData);
     try{
      let savedProduct: Product;

      if (mode === "create"){
        savedProduct = await createProduct(dataToSend);
      }
      else{
        savedProduct = await updateProduct(product!.id, dataToSend);
      }

      if (imageFile){
        await uploadProductImage(savedProduct.id, imageFile);
      }
      onSave(savedProduct);
      onClose();
     }catch (error){
      console.error("Error guardando producto:", error);
     }
    };
   
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {mode === "create" ? "Agregar Producto" : "Editar Producto"}
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
                Título
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: Number(e.target.value), })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTagDropdown(prev => !prev)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white flex justify-between items-center"
              >
                <span>
                  {selectedTags.length > 0
                    ? `${selectedTags.length} seleccionados`
                    : "Seleccionar tags"}
                </span>
                  <svg
                    className="w-5 h-5 text-gray-600 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
              </button>

              {showTagDropdown && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto z-20">
                  {availableTags.map(tag => (
                    <label
                      key={tag.id}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                      />
                      {tag.title}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen del producto 
              </label>
              <input
                type="file"
                accept = "image/*"
                onChange={(e) =>{
                  const file = e.target.files?.[0] ||  null;
                  setImageFile(file);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
                
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
  );
}
