type Product = {
  category?: object;
  category_id?: number;
  description?: string;
  id?: number;
  pictures: Array<string>;
  price?: number;
  tags: Array<Tag>;
  title?: string;
};

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
