// Deleta um FlashCard (endpoint DELETE: /api/FlashCards/{id})
import axiosInstanceDefault from "../axiosInstanceDefault.tsx";

export const deleteFlashCardApi = async (id: number): Promise<void> => {
    try {
        await axiosInstanceDefault.delete(`/api/FlashCards/${id}`);
    } catch (error) {
        console.error("Erro ao deletar flashCard:", error);
        throw error;
    }
};
export default deleteFlashCardApi;