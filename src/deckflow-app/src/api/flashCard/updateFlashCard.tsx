import { FlashCard } from "../../context/Entity/FlashCard/FlashCardTypes.tsx";
import axiosInstance from "../axiosInstance.tsx";
import { getFlashCardById } from "./getFlashCardById.tsx";

export const updateFlashCard = async (flashCard: Partial<FlashCard>): Promise<FlashCard> => {
    try {
        const response = await axiosInstance.put(`/api/FlashCards/${flashCard.id}`, flashCard);

        // Se o status for 204 (No Content), fazemos uma nova requisição GET para obter o flashcard atualizado.
        if (response.status === 204) {
            return await getFlashCardById(Number(flashCard.id));
        }

        // Caso a API retorne dados, utiliza-os para converter
        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("API response is not a valid flashCard object");
        }
        return FlashCard.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao atualizar flashCard:", error);
        throw error;
    }
};

export default updateFlashCard;
