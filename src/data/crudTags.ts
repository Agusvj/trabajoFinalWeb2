import type { Tag } from "../types/entities";

export const useTags = () => {

    const getTags = async(): Promise<Tag[]> =>{
     try {
      const res = await fetch("http://161.35.104.211:8000/tags/", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer agusvj",
        },
      });
      if (!res.ok) {
        throw new Error("Error al obtener etiquetas");
      }
      return await res.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };
    
    const createTag = async (data:any) =>{
    try{
        const res = await fetch("http://161.35.104.211:8000/tags/",{
            method: "POST",
             headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    Authorization: "Bearer agusvj",
                },
                body: JSON.stringify(data),
        });
        if(!res.ok){
            throw new Error ("Error al crear la categoria");
        }
        const json = await res.json();
            return json;

    }catch (error){
            console.error("API error:", error);
            throw error;
        }
};

const updateTag= async (id:number, data:any) =>{
      try{
            const res = await fetch(`http://161.35.104.211:8000/tags/${id}/`,{
                method: "PUT",
                headers:{
                       "Content-Type": "application/json",
                        accept: "application/json",
                        Authorization: "Bearer agusvj",
                        },
                        body: JSON.stringify(data),

                });
                if(!res.ok) throw new Error("Error al actualizar");
                return await res.json();
        } catch(error){
            console.error("API error:", error);
            throw error;
        }

};

 const deleteTag = async(id:number) =>{
        try{
            const res = await fetch(`http://161.35.104.211:8000/tags/${id}/`,{
                method: "DELETE",
                headers:{
                    accept: "application/json",
                    Authorization: "Bearer agusvj",
                },
            });
            if(!res.ok) throw new Error("Error al eliminar etiqueta");
            return true;
        }catch (error){
            console.error("API error:", error);
            throw error;
        }
    };

    return {createTag, updateTag, deleteTag, getTags};
};