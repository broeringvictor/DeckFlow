import axiosInstance from "../AxiosInstance.tsx";
import { Category } from "../../context/Entity/Category/Category";
import { UpdateCategoryRequest } from "../../context/UseCases/Requests/Category/UpdateCategoryRequest.tsx";
import GetCategoryById from "./GetCategoryById.tsx";

export const UpdateCategory = async (
    data: UpdateCategoryRequest
): Promise<Category> => {
    try {
        // Envia os dados atualizados para a API
        const response = await axiosInstance.put(`/api/Categories/${data.id}`, {
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
            throw new Error("API response is not a valid Category object");
        }

        return Category.fromJson(response.data);
    } catch (error) {
        console.error("Erro ao atualizar Categoria:", error);
        throw error;
    }
};

export default UpdateCategory;