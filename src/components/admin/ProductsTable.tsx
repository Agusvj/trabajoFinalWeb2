// src/components/admin/ProductsTable.tsx
import { useState } from "react";
import type { Product, Category } from "../../types/entities";
import ProductModal from "./ProductModal";
import DeleteModal from "./DeleteModal";
import { useProducts } from "../../data/crudProduct";

type ProductsTableProps = {
  products: Product[];
  categories: Category[];
};

export default function ProductsTable({
  products,
  categories,
}: ProductsTableProps) {
  const[productsState, setProductsState] = useState<Product[]>(products);
  const [productModal, setProductModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    product?: Product;
  }>({ isOpen: false, mode: "create" });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    product?: Product;
  }>({ isOpen: false });

  const {deleteProduct} = useProducts();

  const handleEdit = (product: Product) => {
    setProductModal({ isOpen: true, mode: "edit", product });
  };

  const handleDelete = (product: Product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const confirmDelete = async () => {
    try{
      if(!deleteModal.product) return;
      await deleteProduct(deleteModal.product.id);
      setProductsState(prev => 
        prev.filter(p => p.id !== deleteModal.product!.id)
      );

      console.log("Deleting product:", deleteModal.product);

     setDeleteModal({ isOpen: false });
      }catch(error){
      console.error("Error deleting product:", error);
     };
  };


  const handleProductSaved = (newProduct: Product) =>{
    setProductsState((prevProducts) =>{
      const exists = prevProducts.some (p =>p.id === newProduct.id);
      if(exists) {
        return prevProducts.map(p => p.id === newProduct.id ? newProduct : p);
      }
      return [...prevProducts, newProduct];
    });
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Gestión de Productos
          </h2>
          <button
            onClick={() => setProductModal({ isOpen: true, mode: "create" })}
            className="bg-stone-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-stone-800"
          >
            Agregar Producto
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Etiquetas
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsState.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={
                        product.pictures?.length > 0
                          ? `http://161.35.104.211:8000${product.pictures[0]}`
                          : "https://placehold.co/60x60?text=No+Image"
                      }
                      alt={product.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {product.title}
                    </div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {product.category?.title || "Sin categoría"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      ${product.price * 1000}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag.id}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-wood-200 text-wood-800"
                        >
                          {tag.title}
                        </span>
                      ))}
                      {product.tags.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{product.tags.length - 2} más
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-stone-700 hover:text-stone-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
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

        {productsState.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay productos disponibles</p>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={productModal.isOpen}
        onClose={() => setProductModal({ isOpen: false, mode: "create" })}
        product={productModal.product}
        categories={categories}
        mode={productModal.mode}
        onSave = {handleProductSaved}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={confirmDelete}
        title="Eliminar Producto"
        message={`¿Estás seguro de que deseas eliminar "${deleteModal.product?.title}"? Esta acción no se puede deshacer.`}
      />
    </>
  );
}
