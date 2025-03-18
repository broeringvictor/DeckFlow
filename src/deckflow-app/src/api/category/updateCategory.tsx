import axiosInstanceDefault from "../axiosInstanceDefault.tsx";

import {UpdateCategoryRequest} from "../../context/UseCases/Requests/Category/UpdateCategoryRequest.tsx";
import GetCategoryById from "./getCategoryById.tsx";
import {Category} from "../../context/entities/category/category.tsx";

export const updateCategory = async (
    data: UpdateCategoryRequest
): Promise<Category> => {
    try {
        // Envia os dados atualizados para a API
        const response = await axiosInstanceDefault.put(`/api/Categories/${data.id}`, {
            id: data.id,
            title: data.title,
            description: data.description,
        });

        // Verifica o status da resposta
        if (response.status === 204) {
            // Se não houver conteúdo, busca a categoria atualizada pelo ID
            return await GetCategoryById(Number(data.id));
        }

        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("API response is not a valid category object");
        }

        return Category.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao atualizar Categoria:", error);
        throw error;
    }
};

export default updateCategory;