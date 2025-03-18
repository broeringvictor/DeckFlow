
export interface CreateApiKeyConfigurationRequest {
    provider: "OpenAI" | "Deepseek";
    apiKey: string;
}
