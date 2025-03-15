import { FlashCard } from "../../context/Entity/FlashCard/FlashCardTypes.tsx";
import axiosInstance from "../AxiosInstance.tsx";
import { GetFlashCardById } from "./GetFlashCardById.tsx";

export const updateFlashCard = async (flashCard: Partial<FlashCard>): Promise<FlashCard> => {
    try {
        const response = await axiosInstance.put(`/api/FlashCards/${flashCard.id}`, flashCard);

        // Se o status for 204 (No Content), fazemos uma nova requisição GET para obter o flashcard atualizado.
        if (response.status === 204) {
            return await GetFlashCardById(Number(flashCard.id));
        }

        // Caso a API retorne dados, utiliza-os para converter
        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("API response is not a valid FlashCard object");
        }
        return FlashCard.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao atualizar FlashCard:", error);
        throw error;
    }
};

export default updateFlashCard;
