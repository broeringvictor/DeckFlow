import {ApiKeyConfigurationEntity} from "../../context/Entity/ApiKeyConfiguration/ApiKeyConfiguration.tsx";
import {getApiKeyConfiguration} from "../../api/apiKeyConfiguration/getApiKeyConfiguration.tsx";


class ConfigService {
    private static instance: ConfigService;
    configCache: ApiKeyConfigurationEntity | null = null;
    private lastFetchTime: number = 0;
    private cacheDuration: number = 5 * 60 * 1000; // 5 minutos em milissegundos

    private constructor() {}

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }

    public async getConfig(): Promise<ApiKeyConfigurationEntity> {
        if (this.isCacheValid()) {
            return this.configCache!;
        }

        try {
            const freshConfig = await getApiKeyConfiguration();
            this.configCache = freshConfig;
            this.lastFetchTime = Date.now();
            return freshConfig;
        } catch (error) {
            if (this.configCache) {
                console.warn("Using cached config due to fetch error:", error);
                return this.configCache;
            }
            throw new Error("Failed to fetch config and no cache available");
        }
    }

    public invalidateCache(): void {
        this.lastFetchTime = 0;
    }

    private isCacheValid(): boolean {
        return Date.now() - this.lastFetchTime < this.cacheDuration && this.configCache !== null;
    }
}

export const configService = ConfigService.getInstance();