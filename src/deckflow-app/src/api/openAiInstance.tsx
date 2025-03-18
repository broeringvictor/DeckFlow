import OpenAI from "openai";
import {configService} from "../hooks/ApiKeyConfiguration/ConfigService.ts";

let openAiInstance: OpenAI | null = null;

export async function getOpenAiInstance(): Promise<OpenAI> {
    if (!openAiInstance) {
        const config = await configService.getConfig();
        openAiInstance = new OpenAI({
            apiKey: config.openAiApiKey || undefined,
            dangerouslyAllowBrowser: true,
        });
    }
    return openAiInstance;
}