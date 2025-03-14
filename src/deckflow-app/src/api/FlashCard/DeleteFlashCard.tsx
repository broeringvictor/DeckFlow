// Deleta um flashcard (endpoint DELETE: /api/FlashCards/{id})
import axiosInstance from "../AxiosInstance.tsx";

export const deleteFlashCard = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/FlashCards/${id}`);
    } catch (error) {
        console.error("Erro ao deletar FlashCard:", error);
        throw error;
    }
};
export default deleteFlashCard;