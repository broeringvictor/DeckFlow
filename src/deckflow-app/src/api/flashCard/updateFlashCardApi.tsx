import axiosInstanceDefault from "../axiosInstanceDefault.tsx";
import {getFlashCardByIdApi} from "./getFlashCardByIdApi.tsx";
import {FlashCard} from "../../context/entities/flashCard/flashCard.tsx";

export const updateFlashCardApi = async (flashCard: Partial<FlashCard>): Promise<FlashCard> => {
    try {
        const response = await axiosInstanceDefault.put(`/api/FlashCards/${flashCard.id}`, flashCard);

        // Se o status for 204 (No Content), fazemos uma nova requisição GET para obter o flashcard atualizado.
        if (response.status === 204) {
            return await getFlashCardByIdApi(Number(flashCard.id));
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

export default updateFlashCardApi;
