﻿import axiosInstanceDefault from "../axiosInstanceDefault.tsx";
import {FlashCard} from "../../context/entities/flashCard/flashCard.tsx";

export const createFlashCardApi = async (data: Partial<FlashCard>): Promise<FlashCard> => {
    try {
        // Posta os dados fornecidos para a API
        const response = await axiosInstanceDefault.post("/api/FlashCards", data);

        // Verifica se a API retornou um objeto válido
        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("Verifique novamente os campos e tente novamente.");
        }

        // Retorna o flashCard criado, utilizando o `fromJson`
        return FlashCard.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao criar flashCard:", error);
        throw error;
    }
};

export default createFlashCardApi;