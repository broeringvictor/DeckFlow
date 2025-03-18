import {
    CreateApiKeyConfigurationRequest
} from "../../context/useCases/request/createApiKeyConfigurationRequest.ts";
import axiosInstanceDefault from "../axiosInstanceDefault.tsx";
import {ApiKeyConfigurationEntity} from "../../context/entities/apiKeyConfiguration/apiKeyConfiguration.tsx";


const createApiKeyConfigurationApi = async (
    data: CreateApiKeyConfigurationRequest
): Promise<ApiKeyConfigurationEntity> => {
    try {
        const requestBody = {
            provider: data.provider,
            apiKey: data.apiKey
        };

        const response = await axiosInstanceDefault.post(
            "/api/ApiKeyConfiguration",
            requestBody
        );

        return ApiKeyConfigurationEntity.fromApiKeyConfiguration(response.data);
    } catch (error) {
        console.error("Erro ao criar apiKeyConfiguration:", error);
        throw new Error("Erro ao salvar chave. Verifique o endpoint e tente novamente.");
    }
};
export default createApiKeyConfigurationApi;