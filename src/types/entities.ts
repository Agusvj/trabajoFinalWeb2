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

export type Category = {
  description: string;
  id: number;
  picture: string;
  title: string;
} 
export type Tag = {
  title: string;
  id: number;
};

export type HomeFiltersProps = {
  filterByPrice: (minPrice: number, maxPrice: number) => void;
  resetProducts: () => void;
  filterByValue: (value: string) => void;
  tags: Array<{ title: string; id: number }>;
  filterByTag: (tagId: number) => void;
};
