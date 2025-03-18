import {useEffect, useState} from "react";
import axiosInstanceDefault from "../../api/axiosInstanceDefault.tsx";
import {Category} from "../../context/entities/category/category.tsx";


const useGetCategoryById = (id: number) => {
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategoryById = async () => {
        setLoading(true);
        setError(null);

        try {
            // Faz a requisição para obter a categoria pelo ID
            const response = await axiosInstanceDefault.get(`/api/Categories/${id}`);

            // Verifica se a resposta é válida
            if (typeof response.data !== "object" || response.data === null) {
                throw new Error("A resposta da API não é um objeto válido.");
            }

            // Converte o objeto para uma instância de category
            const fetchedCategory = Category.fromJson(response.data);
            setCategory(fetchedCategory);
        } catch (error) {
            console.error("Erro ao buscar categoria por ID:", error);
            setError((error as Error).message || "Ocorreu um erro ao buscar a categoria.");
        } finally {
            setLoading(false);
        }
    };

    // Efeito para buscar a categoria quando o ID mudar
    useEffect(() => {
        if (id) {
            fetchCategoryById();
        }
    }, [id]);

    return {
        category,
        loading,
        error,
        refetch: fetchCategoryById, // Permite refazer a requisição manualmente
    };
};

export default useGetCategoryById;