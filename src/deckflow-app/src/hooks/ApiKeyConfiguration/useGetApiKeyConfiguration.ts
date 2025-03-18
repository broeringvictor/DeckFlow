// Arquivo: useGetApiKeyConfiguration.ts (atualizado)
import { useState, useEffect } from "react";
import { configService } from "./ConfigService";
import {ApiKeyConfigurationEntity} from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";

const useGetApiKeyConfiguration = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiConfig, setApiConfig] = useState<ApiKeyConfigurationEntity | null>(null);

    const getApiKeyConfiguration = async () => {
        setLoading(true);
        setError(null);

        try {
            const config = await configService.getConfig();
            setApiConfig(config);
        } catch (error) {
            setError((error as Error).message || "Erro ao buscar configurações");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getApiKeyConfiguration();
    }, []);

    return { loading, error, apiConfig, refresh: getApiKeyConfiguration };
};

export default useGetApiKeyConfiguration;