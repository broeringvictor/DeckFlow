import axiosInstance from "../AxiosInstance.tsx";
import {FlashCard} from "../../entity/FlashCard/FlashCardTypes.tsx";

export const CreateFlashCard = async (
    question: string,
    answer: string,
    incorrectAnswerA?: string | null,
    incorrectAnswerB?: string | null,
    incorrectAnswerC?: string | null,
    incorrectAnswerD?: string | null,
    cardImage?: string | null,
    categoryId?: number
): Promise<FlashCard> => {
    try {
        const response = await axiosInstance.post("/api/FlashCards", {
            question,
            answer,
            incorrectAnswerA,
            incorrectAnswerB,
            incorrectAnswerC,
            incorrectAnswerD,
            cardImage,
            categoryId,
        });

        // Verifica se a resposta da API é válida
        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("Verifique novamente os campos e tente novamente.");
        }

        return FlashCard.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao criar FlashCard:", error);
        throw error;
    }
};

export default CreateFlashCard;

