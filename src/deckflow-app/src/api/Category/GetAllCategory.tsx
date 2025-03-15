
import axiosInstance from "../AxiosInstance.tsx";
import {Category} from "../../context/Entity/Category/Category.tsx";

export const GetAllCategory = async (): Promise<Category[]> => {
    try {
        const response = await axiosInstance.get("/api/Categories");

        // Verifica se a resposta é um array antes de mapear
        if (!Array.isArray(response.data)) {
            throw new Error("API response is not an array");
        }

        return response.data.map((json) => Category.fromJson(json));
    } catch (error) {
        console.error("Erro ao buscar FlashCards:", error);
        return [];
    }
};
