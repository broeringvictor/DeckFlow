import { createApi } from 'unsplash-js';

let unsplashInstance: ReturnType<typeof createApi> | null = null;

export async function getUnsplashInstance(): Promise<ReturnType<typeof createApi>> {
    if (!unsplashInstance) {
        const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
        if (!accessKey) {
            throw new Error("Variável VITE_UNSPLASH_ACCESS_KEY não foi definida no .env");
        }

        unsplashInstance = createApi({
            accessKey,
            // se estiver no Node 18+, já tem fetch global
        });
    }
    return unsplashInstance;
}
