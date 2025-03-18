import React, {useState} from "react";
import {useStudy} from "../../hooks/Study";
import GetStudy from "../../components/form/GetStudy";
import FlashCardStepper from "../../components/flashcard/FlashCardStepper";
import './Study.css';

const Study: React.FC = () => {
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [numberOfCards, setNumberOfCards] = useState<number | undefined>(undefined);
    const [submitTriggered, setSubmitTriggered] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { flashCards, loading, error } = useStudy(
        submitTriggered ? categoryId : undefined,
        submitTriggered ? numberOfCards : undefined
    );

    const handleFormSubmit = (submittedCategoryId: number, submittedNumberOfCards: number) => {
        setCategoryId(submittedCategoryId);
        setNumberOfCards(submittedNumberOfCards);
        setSubmitTriggered(true);
    };

    return (
        <div className="study-wrapper">
            <div className="menu-container">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? "🔽 Expandir" : "🔼 Minimizar"}
                </button>
                <div className={`collapse ${isCollapsed ? "" : "show"}`}>
                    <h1>Study</h1>
                    <GetStudy onSubmit={handleFormSubmit} />
                    {loading && <p>Carregando FlashCards...</p>}
                    {error && <p className="text-danger">{error}</p>}
                </div>
            </div>
            <div className="flashcards-container">
                {!loading && !error && submitTriggered && flashCards.length > 0 && (
                    <FlashCardStepper flashcards={flashCards} />
                )}
                {!loading && !error && submitTriggered && flashCards.length === 0 && (
                    <p>Nenhum FlashCard encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default Study;
