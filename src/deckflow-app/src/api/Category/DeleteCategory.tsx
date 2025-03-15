// Deleta um flashcard (endpoint DELETE: /api/FlashCards/{id})
import axiosInstance from "../AxiosInstance.tsx";

export const DeleteCategory = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/Categories/${id}`);
    } catch (error) {
        console.error("Erro ao deletar FlashCard:", error);
        throw error;
    }
};
export default DeleteCategory;