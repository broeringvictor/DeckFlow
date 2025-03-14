import { FlashCard } from "../../entity/FlashCard/FlashCardTypes.tsx";
import axiosInstance from "../AxiosInstance.tsx";

export const GetAllFlashCards = async (): Promise<FlashCard[]> => {
    try {
        const response = await axiosInstance.get("/api/FlashCards");

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
