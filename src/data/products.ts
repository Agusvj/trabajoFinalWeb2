export type Product = {
  category?: Category;
  category_id?: number;
  description: string;
  id: number;
  pictures: Array<string>;
  price: number;
  tags: Array<Tag>;
  title?: string;
};
type Category = {
    title: string;
    description: string;
}
type Tag = {
  title: string;
  id: number;
};

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
    console.log(data);

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

