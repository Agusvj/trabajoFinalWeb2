import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../data/products";
import ProductDetail from "../components/layout/ProductDetail"
import type { Product } from "../data/products";



export default function ProductDetailWrapper() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);


  useEffect(() => {
    if (productId) {
      getProductById(parseInt(productId)).then((data) => {
        if (data) setProduct(data);
      });
    }
  }, [productId]);

  if (!product) return <p>Cargando producto...</p>;

  return <ProductDetail product={product} />;
}
