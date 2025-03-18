import axiosInstanceDefault from "../axiosInstanceDefault.tsx";
import {Category} from "../../context/entities/category/category.tsx";


export const getAllCategory = async (): Promise<Category[]> => {
    try {
        const response = await axiosInstanceDefault.get("/api/Categories");

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
