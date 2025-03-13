import React, { useState } from "react";
import { useFlashCardData } from "../../hooks/flashcard";
import GetStudy from "../../components/form/GetStudy";
import FlashCardWithImage from "../../components/flashcard/FlashCardWithImage.tsx";
import FlashCardNoImage from "../../components/flashcard/FlashCardNoImage.tsx";


const Study: React.FC = () => {
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [numberOfCards, setNumberOfCards] = useState<number | undefined>(undefined);
    const [submitTriggered, setSubmitTriggered] = useState(false);

    const { flashCards, loading, error } = useFlashCardData(
        submitTriggered ? categoryId : undefined,
        submitTriggered ? numberOfCards : undefined
    );

    // Callback do formulário para atualizar os parâmetros e disparar a consulta
    const handleFormSubmit = (submittedCategoryId: number, submittedNumberOfCards: number) => {
        setCategoryId(submittedCategoryId);
        setNumberOfCards(submittedNumberOfCards);
        setSubmitTriggered(true);
    };

    return (
        <div>
            <h1>Study FlashCards</h1>
            <GetStudy onSubmit={handleFormSubmit} />

            {loading && <p>Carregando FlashCards...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && submitTriggered && flashCards.length > 0 && (
                <div className="d-flex flex-wrap gap-3">
                    {flashCards.map((card) => (
                        <div key={card.id}>
                            {card.cardImage ? (
                                <FlashCardWithImage {...card} />
                            ) : (
                                <FlashCardNoImage {...card} />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && submitTriggered && flashCards.length === 0 && (
                <p>Nenhum FlashCard encontrado.</p>
            )}
        </div>
    );
};

export default Study;
