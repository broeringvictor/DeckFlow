export interface ApiKeyConfiguration {
    id: number;
    openAiApiKey: string | null;
    deepseekApiKey: string | null;
    lastUpdated?: string;
}

export class ApiKeyConfigurationEntity {
    id: number;
    openAiApiKey: string | null;
    deepseekApiKey: string | null;
    lastUpdated?: string;

    constructor(init: Partial<ApiKeyConfigurationEntity>) {
        this.id = init.id ?? 0;
        this.openAiApiKey = init.openAiApiKey ?? null;
        this.deepseekApiKey = init.deepseekApiKey ?? null;
        this.lastUpdated = init.lastUpdated;
    }

    static fromApiKeyConfiguration(config: ApiKeyConfiguration): ApiKeyConfigurationEntity {
        return new ApiKeyConfigurationEntity({
            id: config.id,
            openAiApiKey: config.openAiApiKey,
            deepseekApiKey: config.deepseekApiKey,
            lastUpdated: config.lastUpdated
        });
    }
}