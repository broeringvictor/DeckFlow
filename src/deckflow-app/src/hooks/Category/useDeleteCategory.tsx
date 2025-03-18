import { useState } from "react";
import deleteCategory from "../../api/category/deleteCategory.tsx";


const useDeleteCategory = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const deleteCategory = async (id: number): Promise<void> => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Faz a solicitação de exclusão via API (função correta)
            await deleteCategory(id);

            // Marca a operação como bem-sucedida
            setSuccess(true);
        } catch (err) {
            console.error("Erro ao excluir a categoria:", err);
            setError(
                (err as Error).message || "Ocorreu um erro ao excluir a categoria."
            );
        } finally {
            setLoading(false);
        }
    };

    return { deleteCategory, loading, error, success };
};

export default useDeleteCategory;