import { useState, useEffect } from "react";
import {FlashCard} from "../../context/entities/flashCard/flashCard.tsx";

import {getStudyFlashCards} from "../../api/study/getStudyFlashCards.tsx";

export const useStudy = (categoryId?: number, numberOfCards?: number) => {
    const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Inicial loading como false
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Função que será chamada para buscar FlashCards
        const fetchFlashCards = async () => {
            if (categoryId === undefined || numberOfCards === undefined) {
                return; // Não faz nada se parâmetros não forem fornecidos
            }

            setLoading(true); // Ativa o carregamento antes de iniciar a requisição
            setError(null); // Reseta erro ao iniciar nova requisição

            try {
                const data = await getStudyFlashCards(categoryId, numberOfCards); // Chama a API
                setFlashCards(data); // Atualiza os FlashCards
            } catch (err) {
                if (err instanceof Error) {
                    console.error("Erro ao carregar os FlashCards:", err.message);
                    setError("Erro ao carregar os FlashCards. Tente novamente mais tarde.");
                }
            } finally {
                setLoading(false); // Finaliza o carregamento após a requisição
            }
        };

        // Aqui tratamos o cancelamento para evitar atualizações após o componente desmontar
        let isMounted = true;

        // Função para gerenciar async corretamente dentro do `useEffect`
        const executeFetch = async () => {
            if (isMounted) {
                await fetchFlashCards();
            }
        };

        executeFetch().catch((err) => {
            console.error("Erro inesperado ao executar fetchFlashCards:", err);
            setError("Erro inesperado ao carregar os FlashCards.");
        });

        // Cleanup do efeito: evita atualizações se o componente for desmontado
        return () => {
            isMounted = false;
        };
    }, [categoryId, numberOfCards]); // Dependências do useEffect

    return { flashCards, loading, error };
};