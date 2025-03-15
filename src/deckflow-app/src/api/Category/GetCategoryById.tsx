
import axiosInstance from "../AxiosInstance.tsx";
import {Category} from "../../context/Entity/Category/Category.tsx";

export const GetFlashCardById = async (id: number): Promise<Category> => {
    try {
        const response = await axiosInstance.get(`/api/Categories/${id}`);

        // Agora checamos se a resposta é um objeto
        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("A resposta da API não é um objeto válido");
        }

        // Se tudo certo, retornamos o FlashCard convertido
        return Category.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao buscar FlashCard por ID:", error);
        throw error;
    }
};


export default GetFlashCardById;