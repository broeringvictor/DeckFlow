import axiosInstanceDefault from "../axiosInstanceDefault.tsx";

import {CreateCategoryRequest} from "../../context/UseCases/Requests/Category/CreateCategoryRequest.tsx";
import {Category} from "../../context/entities/category/category.tsx";


export const createCategory = async (
    data: CreateCategoryRequest
): Promise<Category> => {
    try {
        // Posta os dados fornecidos para a API
        const response = await axiosInstanceDefault.post("/api/Categories", data);

        // Verifica se a API retornou um objeto válido
        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("Verifique novamente os campos e tente novamente.");
        }


        return Category.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao criar flashCard:", error);
        throw error;
    }
};


export default createCategory;