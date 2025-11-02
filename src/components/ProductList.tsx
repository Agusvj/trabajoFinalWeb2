
import { useEffect, useState } from "react";
import  type { Category } from "../types/entities";
import type { Product } from "../types/entities";
import ProductCard from "./ProductCard";
import { getProducts } from "../data/products";
import LoadingSpinner from "./LoadingSpinner";

type ProductListCategory = {
    category : Category;
}
export default function ProductList ({category}: ProductListCategory){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        getProducts().then((data)=>{
            const filtered = data.filter((p)=>p.category_id === category.id);
            setProducts(filtered);
        })
        .finally(()=> setLoading(false));
    },[category.id]);

    if (loading) return <LoadingSpinner/>;
    if(products.length === 0) return <p>No hay productos en esta categoría</p>;
    return(
        <div>
            <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product)=>(
                    <ProductCard key= {product.id} product= {product}/>
                ))}
            </div>
        </div>
    );

 
}