import ApiKeyConfigurationEntity from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";
import {
    CreateApiKeyConfigurationRequest
} from "../../context/UseCases/Requests/ApiKeyConfiguration/CreateApiKeyConfigurationRequest.ts";
import axiosInstance from "../AxiosInstance.tsx";

export const CreateApiKeyConfiguration = async (
    data: CreateApiKeyConfigurationRequest
): Promise<ApiKeyConfigurationEntity> => {
    try {
        // Posta os dados fornecidos para a API
        const response = await axiosInstance.post("/api/ApiKeyConfigurations", data);

        // Verifica se a API retornou um objeto válido
        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("Verifique novamente os campos e tente novamente.");
        }

        // Substitua a linha anterior para usar a classe ApiKeyConfigurationEntity
        return ApiKeyConfigurationEntity.fromApiKeyConfiguration(response.data);
    } catch (error) {
        console.error("Erro ao criar ApiKeyConfiguration:", error);
        throw error;
    }
};