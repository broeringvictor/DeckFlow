import { useState } from "react";
import {
    CreateApiKeyConfigurationRequest
} from "../../context/UseCases/Requests/ApiKeyConfiguration/CreateApiKeyConfigurationRequest.ts";
import { ApiKeyConfiguration } from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";
import { CreateApiKeyConfiguration } from "../../api/ApiKeyConfiguration/CreateApiKeyConfiguration.tsx";

const useCreateApiKeyConfiguration = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState<ApiKeyConfiguration | null>(null); // Renomeado para maior clareza

    const createApiKeyConfiguration = async (data: CreateApiKeyConfigurationRequest) => {
        setLoading(true);
        setError(null);

        try {
            // Chama o serviço de criação
            const createdApiKey = await CreateApiKeyConfiguration(data);
            setApiKey(createdApiKey); // Corrige o valor definido no estado
        } catch (error) {
            console.error(error);
            setError((error as Error).message || "Ocorreu um erro ao criar a configuração da chave de API.");
        } finally {
            setLoading(false);
        }
    };

    return {
        createApiKeyConfiguration,
        loading,
        error,
        apiKey,
    };
};

export default useCreateApiKeyConfiguration;