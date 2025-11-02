import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../data/products";
import ProductDetail from "../components/ProductDetail";
import type { Product } from "../types/entities";
import LoadingSpinner from "../components/LoadingSpinner";

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

  if (!product) return <LoadingSpinner/>;

  return <ProductDetail product={product} />;
}
