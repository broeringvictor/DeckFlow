import axiosInstance from "../AxiosInstance.tsx";
import { FlashCard } from "../../entity/FlashCard/FlashCardTypes.tsx";

export const CreateFlashCard = async (data: Partial<FlashCard>): Promise<FlashCard> => {
    try {
        // Posta os dados fornecidos para a API
        const response = await axiosInstance.post("/api/FlashCards", data);

        // Verifica se a API retornou um objeto válido
        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("Verifique novamente os campos e tente novamente.");
        }

        // Retorna o FlashCard criado, utilizando o `fromJson`
        return FlashCard.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao criar FlashCard:", error);
        throw error;
    }
};

export default CreateFlashCard;