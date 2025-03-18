import { useState } from "react";

import { getUnsplashInstance } from "../../api/unsplashInstance.ts";
import {getDeepSeekInstance} from "../../api/deepSeekInstance.tsx";

const useWebSearch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Armazena as 3 opções de imagem retornadas
    const [imageOptions, setImageOptions] = useState<string[]>([]);

    // URL final escolhida pelo usuário
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const searchImage = async (question: string, correctAnswer: string) => {
        setLoading(true);
        setError(null);
        setImageUrl(null);
        setImageOptions([]);

        try {
            // 1) Gera as tags usando o modelo do OpenAI
            const client = await getDeepSeekInstance();
            const description = `Questão: ${question}\nResposta: ${correctAnswer}`;

            const tagsCompletion = await client.chat.completions.create({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: `You are an advanced assistant specialized in generating exactly 3 relevant image keywords for a photo search. 
                                    Only return those 3 keywords, separated by commas, and no additional text.`
                    },
                    {
                        role: "user",
                        content: `Based on the text below, generate exactly 3 relevant keywords in English for a photo search, separated by commas, with no additional text:
                        ${description}`,

                    }
                ]
            });

            const responseText = tagsCompletion?.choices?.[0]?.message?.content || "";
            // Converte a string de palavras-chave em array
            const tags = responseText
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean);

            console.log("Generated tags:", tags);

            if (tags.length < 1) {
                throw new Error("Nenhuma tag foi gerada pelo ChatGPT.");
            }

            // 2) Para cada tag, busca 1 imagem no Unsplash e armazena o link
            const unsplash = await getUnsplashInstance();
            const newImageOptions: string[] = [];

            for (const singleTag of tags) {
                const result = await unsplash.search.getPhotos({
                    query: singleTag,
                    perPage: 1,
                    orientation: "landscape",
                });

                if (result.type === "error") {
                    throw new Error(result.errors?.[0] ?? "Erro ao buscar imagem no Unsplash");
                }

                const photoResults = result.response.results;
                if (photoResults.length > 0) {
                    // Pega a primeira imagem encontrada
                    const foundImageUrl = photoResults[0].urls.full;
                    newImageOptions.push(foundImageUrl);
                }
            }

            if (newImageOptions.length === 0) {
                throw new Error("Não foram encontradas imagens para as tags geradas.");
            }

            setImageOptions(newImageOptions);
            // Observação: aqui ainda não definimos imageUrl;
            // aguardamos o usuário escolher no popup.

        } catch (err) {
            console.error(err);
            const message = err instanceof Error ? err.message : "Falha ao buscar a imagem";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    // Função para escolher uma das opções e definir como a imagem final
    const chooseImageOption = (url: string) => {
        setImageUrl(url);
    };

    return {
        loading,
        error,
        imageUrl,      // imagem final escolhida
        imageOptions,  // lista de até 3 imagens candidatas
        searchImage,
        chooseImageOption
    };
};

export default useWebSearch;
