import OpenAI from "openai";
import {configService} from "../hooks/ApiKeyConfiguration/ConfigService.ts";



let deepSeekInstance: OpenAI | null = null;

export async function getDeepSeekInstance(): Promise<OpenAI> {
    if (!deepSeekInstance) {
        const config = await configService.getConfig();
        deepSeekInstance = new OpenAI({
            baseURL: 'https://api.deepseek.com',
            apiKey: config.deepseekApiKey || undefined,
            dangerouslyAllowBrowser: true,
        });
    }
    return deepSeekInstance;
}
