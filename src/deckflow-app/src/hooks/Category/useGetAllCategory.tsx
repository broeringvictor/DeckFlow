import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance.tsx";
import { Category } from "../../context/Entity/Category/Category";

const useGetAllCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);

        try {
            // Faz a requisição para obter todas as categorias
            const response = await axiosInstance.get<Category[]>("/api/Categories");

            // Verifica se a resposta é válida e converte os dados
            const categoryList = response.data.map((item) => Category.fromJson(item));
            setCategories(categoryList);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            setError((error as Error).message || "Ocorreu um erro ao buscar categorias.");
        } finally {
            setLoading(false);
        }
    };

    // Efeito para buscar categorias ao montar o componente
    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        refetch: fetchCategories, // Permite refazer a chamada à API
    };
};

export default useGetAllCategory;