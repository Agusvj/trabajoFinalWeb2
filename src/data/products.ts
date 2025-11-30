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
export async function getProductById(id: number): Promise<Product | null> {
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  return product || null;
}
