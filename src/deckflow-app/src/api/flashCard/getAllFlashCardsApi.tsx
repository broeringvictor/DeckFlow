import {FlashCard} from "../../context/entities/flashCard/flashCard.tsx";
import axiosInstanceDefault from "../axiosInstanceDefault.tsx";

export const getAllFlashCardsApi = async (): Promise<FlashCard[]> => {
    try {
        const response = await axiosInstanceDefault.get("/api/FlashCards");

        // Verifica se a resposta é um array antes de mapear
        if (!Array.isArray(response.data)) {
            throw new Error("API response is not an array");
        }

        return response.data.map((json) => FlashCard.fromJson(json));
    } catch (error) {
        console.error("Erro ao buscar FlashCards:", error);
        return [];
    }
};
