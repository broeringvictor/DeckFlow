
import axiosInstance from "../AxiosInstance.tsx";
import {ApiKeyConfigurationEntity} from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";

export const GetApiKeyConfiguration = async (): Promise<ApiKeyConfigurationEntity[]> => {
    try {
        const response = await axiosInstance.get("api/ApiKeyConfiguration");


        if (!Array.isArray(response.data)) {
            throw new Error("API response is not an array");
        }

        return response.data.map((json) => ApiKeyConfigurationEntity.fromApiKeyConfiguration(json));
    } catch (error) {
        console.error("Erro ao buscar configurações de API Key:", error);
        return [];
    }
};
