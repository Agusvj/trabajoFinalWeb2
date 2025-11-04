import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { getCategoriesById } from "../data/categories";
import type { Category } from "../types/entities";
import ProductList from "../components/ProductList";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Categories() {
    const {categoryId} = useParams();
    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() =>{
        if (categoryId){
            getCategoriesById(parseInt(categoryId)).then((data) =>{
                if (data) setCategory(data);
            });
        }
    }, [categoryId]);
    if(!category) return <LoadingSpinner/>;
    return <ProductList category={category}/>;
}