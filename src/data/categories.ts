import type { Category } from "../types/entities";
export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      "http://161.35.104.211:8000/categories/?skip=0&limit=100",
      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer agusvj",
        },
      }
    );
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("Error al buscar las categorias");
    throw error;
  }
}
export async function getCategoriesById(id: number): Promise<Category| undefined>  {
  const categories = await getCategories();
  const cat = categories.find((p) => p.id ===id);
  return cat;

  
}


