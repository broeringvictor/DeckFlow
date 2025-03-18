// CreateApiKeyConfigurationRequest.ts
import {ApiKeyConfigurationEntity} from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";
import axiosInstance from "../AxiosInstance.tsx";
import {
    CreateApiKeyConfigurationRequest
} from "../../context/UseCases/Requests/ApiKeyConfiguration/CreateApiKeyConfigurationRequest.ts";




export const CreateApiKeyConfiguration = async (
    data: CreateApiKeyConfigurationRequest
): Promise<ApiKeyConfigurationEntity> => {
    try {
        // Altere de .patch() para .post()
        const response = await axiosInstance.post( // <--- Corrigido aqui
            "/api/ApiKeyConfiguration",
            data
        );
        return ApiKeyConfigurationEntity.fromApiKeyConfiguration(response.data);
    } catch (error) {
        console.error("Erro ao criar ApiKeyConfiguration:", error);
        throw new Error("Erro ao salvar chave. Verifique o endpoint e tente novamente.");
    }
};