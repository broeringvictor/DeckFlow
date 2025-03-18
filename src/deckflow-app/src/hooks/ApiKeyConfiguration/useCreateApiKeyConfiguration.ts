import {useState} from "react";

import createApiKeyConfigurationApi from "../../api/apiKeyConfiguration/createApiKeyConfigurationApi.tsx";
import {ApiKeyConfigurationEntity} from "../../context/entities/apiKeyConfiguration/apiKeyConfiguration.tsx";
import {
    CreateApiKeyConfigurationRequest
} from "../../context/useCases/requests/apiKeyConfiguration/createApiKeyConfigurationRequest.ts";


const useCreateApiKeyConfiguration = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiKeyConfig, setApiKeyConfig] = useState<ApiKeyConfigurationEntity | null>(null);

    const createApiKeyConfiguration = async (data: CreateApiKeyConfigurationRequest) => {
        setLoading(true);
        setError(null);

        try {
            const createdConfig = await createApiKeyConfigurationApi(data);
            setApiKeyConfig(createdConfig);
        } catch (error) {
            const message = (error as Error).message;
            setError(message || "Erro ao criar configuração de API");
        } finally {
            setLoading(false);
        }
    };

    return { createApiKeyConfiguration, loading, error, apiKeyConfig };
};
export default useCreateApiKeyConfiguration;