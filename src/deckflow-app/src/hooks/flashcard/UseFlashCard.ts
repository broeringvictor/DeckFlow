// useFlashCard.tsx
import { useState, useEffect, useCallback } from "react";
import { FlashCard } from "../../context/Entity/FlashCard/FlashCardTypes.tsx";
import { getAllFlashCards } from "../../api/flashCard/getAllFlashCards.tsx";
import { createFlashCard } from "../../api/flashCard/createFlashCard.tsx";
import { updateFlashCard } from "../../api/flashCard/updateFlashCard.tsx";
import { deleteFlashCard } from "../../api/flashCard/deleteFlashCard.tsx";
import { getFlashCardById } from "../../api/flashCard/getFlashCardById.tsx";

interface CreateFlashCardParams {
    question: string;
    answer: string;
    incorrectAnswerA: string;
    incorrectAnswerB: string;
    incorrectAnswerC: string;
    incorrectAnswerD: string;
    cardImage?: string;
    categoryId: number;
}

export const useFlashCard = () => {
    const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFlashCards = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllFlashCards();
            setFlashCards(data);
        } catch (err) {
            console.error("Erro ao buscar FlashCards:", err);
            setError("Erro ao carregar FlashCards. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };


    const addFlashCard = async (flashCardData: CreateFlashCardParams) => {
        setLoading(true);
        setError(null);
        try {

            const newFlashCard = await createFlashCard(flashCardData);

            // Atualiza o estado adicionando o novo flashcard
            setFlashCards((prev) => [...prev, newFlashCard]);
        } catch (err) {
            console.error("Erro ao criar flashCard:", err);
            setError("Erro ao criar flashCard.");
        } finally {
            setLoading(false);
        }
    };


    const editFlashCard = async (flashCard: Partial<FlashCard>) => {
        setLoading(true);
        setError(null);
        try {
            const updatedCard = await updateFlashCard(flashCard);
            setFlashCards((prev) =>
                prev.map((card) => (card.id === updatedCard.id ? updatedCard : card))
            );
        } catch (err) {
            console.error("Erro ao atualizar flashCard:", err);
            setError("Erro ao atualizar flashCard.");
        } finally {
            setLoading(false);
        }
    };

    const removeFlashCard = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteFlashCard(id);
            setFlashCards((prev) => prev.filter((card) => card.id !== id));
        } catch (err) {
            console.error("Erro ao deletar flashCard:", err);
            setError("Erro ao excluir flashCard.");
        } finally {
            setLoading(false);
        }
    };

    // Encapsula a função getFlashCardById com useCallback para estabilizar sua referência
    const getFlashCardByIdFn = useCallback(
        async (id: number): Promise<FlashCard | null> => {
            try {
                const data = await getFlashCardById(id);
                return data;
            } catch (err) {
                console.error("Erro ao buscar flashCard por id:", err);
                setError("Erro ao carregar o flashCard.");
                return null;
            }
        },
        [] // Dependências vazias, assumindo que GetFlashCardById não muda
    );

    useEffect(() => {
        fetchFlashCards();
    }, []);

    return {
        flashCards,
        loading,
        error,
        fetchFlashCards,
        addFlashCard,
        editFlashCard,
        removeFlashCard,
        getFlashCardById: getFlashCardByIdFn,
    };
};
