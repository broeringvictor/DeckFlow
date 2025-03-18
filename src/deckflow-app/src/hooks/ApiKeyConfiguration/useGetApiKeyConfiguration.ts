import {useState} from "react";
import {ApiKeyConfigurationEntity} from "../../context/entities/apiKeyConfiguration/apiKeyConfiguration.tsx";
import getApiKeyConfigurationApi from "../../api/apiKeyConfiguration/getApiKeyConfigurationApi.tsx";


const useGetApiKeyConfiguration = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiConfig, setApiConfig] = useState<ApiKeyConfigurationEntity | null>(null);

    const getApiKeyConfiguration = async () => {
        setLoading(true);
        setError(null);

        try {
            const config = await getApiKeyConfigurationApi();
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
