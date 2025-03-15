import { useState } from "react";
import {

    ApiKeyConfigurationEntity
} from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";
import {GetApiKeyConfiguration} from "../../api/ApiKeyConfiguration/GetApiKeyConfiguration.tsx";



const useGetApiKeyConfiguration = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiConfig, setApiConfig] = useState<ApiKeyConfigurationEntity | null>(null);

    const getApiKeyConfiguration = async () => {
        setLoading(true);
        setError(null);

        try {
            const config = await GetApiKeyConfiguration();
            setApiConfig(config);
        } catch (error) {
            setError((error as Error).message || "Erro ao buscar configurações");
        } finally {
            setLoading(false);
        }
    };

    return { getApiKeyConfiguration, loading, error, apiConfig };
};

export default useGetApiKeyConfiguration;
