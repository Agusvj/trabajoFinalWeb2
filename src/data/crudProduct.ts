export const useProducts = () => {
  const createProduct = async (data: any) => {
    try {
      const res = await fetch("http://161.35.104.211:8000/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "Bearer agusvj",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Error al crear el producto");
      }
      const json = await res.json();
      return json;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  const updateProduct = async (id: number, data: any) => {
    try {
      const res = await fetch(`http://161.35.104.211:8000/products/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "Bearer agusvj",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al actualizar el producto");
      return await res.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const res = await fetch(`http://161.35.104.211:8000/products/${id}/`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: "Bearer agusvj",
        },
      });
      if (!res.ok) throw new Error("Error al eliminar producto");
      return true;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };
  return { createProduct, updateProduct, deleteProduct };
};
