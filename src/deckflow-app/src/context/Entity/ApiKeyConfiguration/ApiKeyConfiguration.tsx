
export interface ApiKeyConfiguration {
    id: number;
    OpenAiApiKey: string;
    DeepseekApiKey: string;
}

export class ApiKeyConfigurationEntity {
    id: number;
    OpenAiApiKey: string;
    DeepseekApiKey: string;

    constructor(init: Partial<ApiKeyConfigurationEntity>) {
        this.id = init.id ?? 0;
        this.OpenAiApiKey = init.OpenAiApiKey ?? '';
        this.DeepseekApiKey = init.DeepseekApiKey ?? '';
    }

    static fromApiKeyConfiguration(config: ApiKeyConfiguration): ApiKeyConfigurationEntity {
        return new ApiKeyConfigurationEntity({
            id: config.id,
            OpenAiApiKey: config.OpenAiApiKey,
            DeepseekApiKey: config.DeepseekApiKey,
        });
    }

    toApiKeyConfiguration(): ApiKeyConfiguration {
        return {
            id: this.id,
            OpenAiApiKey: this.OpenAiApiKey,
            DeepseekApiKey: this.DeepseekApiKey,
        };
    }
}
export default ApiKeyConfigurationEntity;
