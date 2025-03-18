import {useState} from "react";
import {CreateCategoryRequest} from "../../context/useCases/request/createCategoryRequest.tsx";
import CreateCategory from "../../api/category/createCategoryApi.tsx";
import {Category} from "../../context/entities/category/category.tsx";

const useCreateCategory = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState<Category | null>(null);

    const createCategory = async (data: CreateCategoryRequest) => {
        setLoading(true);
        setError(null);

        try {
            // Chama o serviço de criação
            const createdCategory = await CreateCategory(data);
            setCategory(createdCategory);
        } catch (error) {
            console.error(error);
            setError((error as Error).message || "Ocorreu um erro ao criar a categoria.");
        } finally {
            setLoading(false);
        }
    };

    return {
        createCategory,
        loading,
        error,
        category,
    };
};
export default useCreateCategory;