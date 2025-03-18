import { useState } from "react";
import { UpdateCategoryRequest } from "../../context/UseCases/Requests/Category/UpdateCategoryRequest";
import { Category } from "../../context/Entity/Category/Category";
import updateCategory from "../../api/category/updateCategory.tsx";


const useUpdateCategory = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState<Category | null>(null);

    const updateCategory = async (data: UpdateCategoryRequest) => {
        setLoading(true);
        setError(null);

        try {
            // Chama o serviço de atualização da categoria
            const updatedCategory = await updateCategory(data);
            setCategory(updatedCategory); // Salva a categoria atualizada no estado
        } catch (error) {
            console.error(error);
            setError((error as Error).message || "Ocorreu um erro ao atualizar a categoria.");
        } finally {
            setLoading(false);
        }
    };

    return {
        updateCategory,
        loading,
        error,
        category,
    };
};

export default useUpdateCategory;