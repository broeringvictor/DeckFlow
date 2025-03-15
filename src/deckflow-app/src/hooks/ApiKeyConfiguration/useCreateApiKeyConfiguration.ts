import { useState } from "react";
import {
    CreateApiKeyConfigurationRequest
} from "../../context/UseCases/Requests/ApiKeyConfiguration/CreateApiKeyConfigurationRequest.ts";

import { CreateApiKeyConfiguration } from "../../api/ApiKeyConfiguration/CreateApiKeyConfiguration.tsx";
import {ApiKeyConfigurationEntity} from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";

const useCreateApiKeyConfiguration = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiKeyConfig, setApiKeyConfig] = useState<ApiKeyConfigurationEntity | null>(null);

    const createApiKeyConfiguration = async (data: CreateApiKeyConfigurationRequest) => {
        setLoading(true);
        setError(null);

        try {
            const createdConfig = await CreateApiKeyConfiguration(data);
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