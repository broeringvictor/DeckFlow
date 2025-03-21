﻿// Busca flashcards por categoria e quantidade (endpoint customizado)
import {FlashCard} from "../../context/Entity/FlashCard/FlashCardTypes.tsx";
import axiosInstance from "../AxiosInstance.tsx";

export const getStudyFlashCards = async (categoryId?: number, numberOfCards?: number): Promise<FlashCard[]> => {
    try {
        const response = await axiosInstance.post("/api/Study/GetFlashCards", {
            categoryId,
            numberOfCards,
        });

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