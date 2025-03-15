
import {
    CreateApiKeyConfigurationRequest
} from "../../context/UseCases/Requests/ApiKeyConfiguration/CreateApiKeyConfigurationRequest.ts";
import axiosInstance from "../AxiosInstance.tsx";
import {ApiKeyConfigurationEntity} from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";

export const CreateApiKeyConfiguration = async (
    data: CreateApiKeyConfigurationRequest
): Promise<ApiKeyConfigurationEntity> => {
    try {
        const requestBody = {
            provider: data.provider,
            apiKey: data.apiKey
        };

        const response = await axiosInstance.post(
            "/api/ApiKeyConfiguration",
            requestBody
        );

        return ApiKeyConfigurationEntity.fromApiKeyConfiguration(response.data);
    } catch (error) {
        console.error("Erro ao criar ApiKeyConfiguration:", error);
        throw new Error("Erro ao salvar chave. Verifique o endpoint e tente novamente.");
    }
};