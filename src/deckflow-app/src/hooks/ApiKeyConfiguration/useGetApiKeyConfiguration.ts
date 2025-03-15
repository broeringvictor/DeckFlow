import { useState } from "react";
import { ApiKeyConfiguration } from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";
import {GetApiKeyConfiguration} from "../../api/ApiKeyConfiguration/GetApiKeyConfiguration.tsx";

const useGetApiKeyConfiguration = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiKeys, setApiKeys] = useState<ApiKeyConfiguration[]>([]); // Renomeado para maior clareza

    const getApiKeyConfiguration = async () => {
        setLoading(true);
        setError(null);

        try {
            // Chama o serviço de busca
            const apiKeyConfigurations = await GetApiKeyConfiguration();
            setApiKeys(apiKeyConfigurations); // Corrige o valor definido no estado
        } catch (error) {
            console.error(error);
            setError((error as Error).message || "Ocorreu um erro ao buscar as configurações de chave de API.");
        } finally {
            setLoading(false);
        }
    };

    return {
        getApiKeyConfiguration,
        loading,
        error,
        apiKeys,
    };
};

export default useGetApiKeyConfiguration;
