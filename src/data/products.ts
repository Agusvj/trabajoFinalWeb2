import type { Product } from "../types/entities";
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "http://161.35.104.211:8000/products/?skip=0&limit=100",
      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer agusvj",
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Error al buscar los productos");
    throw error;
  }
}

export async function getProductsPaginated(skip: number, limit: number, categoryId?: number): Promise<Product[]> {
  try {
    const url = categoryId 
      ? `http://161.35.104.211:8000/products/?skip=${skip}&limit=${limit}&category_id=${categoryId}`
      : `http://161.35.104.211:8000/products/?skip=${skip}&limit=${limit}`;
    
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer agusvj",
      },
    });
    return await res.json();
  } catch (error) {
    console.log("Error al buscar los productos");
    throw error;
  }
}

export async function getProductsCount(categoryId?: number): Promise<number> {
  try {
    const allProducts = await getProducts();
    return categoryId 
      ? allProducts.filter(p => p.category_id === categoryId).length
      : allProducts.length;
  } catch (error) {
    console.log("Error al contar productos");
    throw error;
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  return product || null;
}
