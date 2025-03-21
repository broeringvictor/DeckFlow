﻿
import axiosInstance from "../AxiosInstance.tsx";
import {ApiKeyConfigurationEntity} from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";

export const GetApiKeyConfiguration = async (): Promise<ApiKeyConfigurationEntity> => {
    try {
        const response = await axiosInstance.get("api/ApiKeyConfiguration");

        // Verifica se é um objeto
        if (typeof response.data !== 'object' || response.data === null) {
            throw new Error("API response is not an object");
        }

        return ApiKeyConfigurationEntity.fromApiKeyConfiguration(response.data);
    } catch (error) {
        console.error("Erro ao buscar configurações de API Key:", error);
        throw error; // Mantenha o throw para capturar no hook
    }
};
