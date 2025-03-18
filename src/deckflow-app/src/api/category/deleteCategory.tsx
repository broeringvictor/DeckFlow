// Deleta um flashcard (endpoint DELETE: /api/FlashCards/{id})
import axiosInstance from "../axiosInstance.tsx";

export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/Categories/${id}`);
    } catch (error) {
        console.error("Erro ao deletar flashCard:", error);
        throw error;
    }
};
export default deleteCategory;