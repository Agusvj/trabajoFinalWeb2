import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { getCategoriesById } from "../data/categories";
import type { Category } from "../types/entities";
import ProductList from "../components/ProductList";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Categories() {
    const {categoryId} = useParams();
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        if (categoryId){
            setLoading(true);
            getCategoriesById(parseInt(categoryId)).then((data) =>{
                if (data) setCategory(data);
                setLoading(false);
            });
        }
    }, [categoryId]);
    
    if(loading) return <LoadingSpinner/>;
    if(!category) return <LoadingSpinner/>;
    return <ProductList category={category}/>;
}