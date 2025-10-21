
import {Link} from "react-router-dom";



type Product = {
  category?:Category;
  category_id?: number;
  description?: string;
  id: number;
  pictures: Array<string>;
  price: number;
  tags: Array<Tag>;
  title?: string;
};

type Tag ={
  title: string;
  id: number;
}
type Category = {
    title: string;
    description: string;
}
type ProductDetailProps ={
    product: Product;
};
    


export default function ProductDetail({
    product
}:ProductDetailProps){


const galleryImages = [0, 1, 2, 3].map((i) =>{
    const src = product.pictures[i % product.pictures.length];
    let classes = "rounded-lg object-cover";
    switch(i){
        case 0:
            classes += product.pictures.length === 1
               ? " row-span-2 aspect-3/4 size-full"
               : " row-span-2 aspect-3/4 size-full max-lg:hidden";
            break;
        case 1: 
            classes += " col-start-2 aspect-3/2 size-full max-lg:hidden";
            break;
        case 2:
             classes += " col-start-2 row-start-2 aspect-3/2 size-full max-lg:hidden";
             break;
        case 3:
            classes += " row-span-2 aspect-4/5 size-full sm:rounded-lg lg:aspect-3/4 max-lg:hidden";
             break;
    }
    return (
      <img
        key={i}
        src={`http://161.35.104.211:8000${src}`}
        alt={`Producto ${i + 1}`}
        className={classes}
       />
    );
  });
return(
    <div className= "bg-white">
        <div className= "pt-6">
            <nav aria-label="Breadcrumb">
                <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                        <div className="flex items-center">
                            <Link to={`/listado?cat=${product.category_id}`}
                            className="mr-2 text-sm font-medium text-gray-900">
                                {product.category?.title}
                            </Link> 
                            <svg viewBox="0 0 16 20" width="16" height="20" fill="currentColor" className="h-5 w-4 text-gray-300">
                              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>   
                        </div>
                    </li>
                    <li>
                        <div>
                            <p className="mr-2 text-sm font-medium text-gray-900">{product.title}</p>
                            <svg viewBox="0 0 16 20" width="16" height="20" fill="currentColor" className="h-5 w-4 text-gray-300">
                              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>

                    </li>
                </ol>
            </nav>
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
                {galleryImages}
            </div>
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {product.title}
                    </h1>
                </div>
              
            
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <p className="text-3xl tracking-tight text-gray-900">${product.price * 1000}</p>

                    
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Etiquetas</h3>
                            {product.tags.map((tag) =>(  
                            <span
                            key={tag.id}
                            className="bg-yellow-400 px-3 py-1.5 text-xs font-medium whitespace-nowrap mr-1"
                            >
                            {tag.title}
                            </span>
                            ))}
                        </div>
                
                        <button  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-800 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                        Agregar al Carrito
                        </button>
                    </div>
                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>
            </div>   
        </div>

    </div>
);
    
}





