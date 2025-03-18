import { FlashCard } from "../../context/Entity/FlashCard/FlashCardTypes.tsx";
import axiosInstance from "../axiosInstance.tsx";

export const getFlashCardById = async (id: number): Promise<FlashCard> => {
    try {
        const response = await axiosInstance.get(`/api/FlashCards/${id}`);

        // Agora checamos se a resposta é um objeto
        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("A resposta da API não é um objeto válido");
        }

        // Se tudo certo, retornamos o flashCard convertido
        return FlashCard.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao buscar flashCard por ID:", error);
        throw error;
    }
};


export default getFlashCardById;