﻿import axiosInstance from "../AxiosInstance.tsx";
import {Category} from "../../context/Entity/Category/Category.tsx";
import {CreateCategoryRequest} from "../../context/UseCases/Requests/Category/CreateCategoryRequest.tsx";



export const CreateCategory = async (
    data: CreateCategoryRequest
): Promise<Category> => {
    try {
        // Posta os dados fornecidos para a API
        const response = await axiosInstance.post("/api/Categories", data);

        // Verifica se a API retornou um objeto válido
        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("Verifique novamente os campos e tente novamente.");
        }


        return Category.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao criar FlashCard:", error);
        throw error;
    }
};


export default CreateCategory;