import React, { useState, useEffect, useRef } from 'react';
import FlashCardWithImage from './FlashCardWithImage';
import FlashCardNoImage from './FlashCardNoImage';

export interface FlashCardData {
    question: string;
    answer: string;
    incorrectAnswerA: string;
    incorrectAnswerB: string;
    incorrectAnswerC: string;
    incorrectAnswerD: string;
    rating: number;
    cardImage?: string;
}

interface FlashCardStepperProps {
    flashcards: FlashCardData[];
}

const FlashCardStepper: React.FC<FlashCardStepperProps> = ({ flashcards }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [answersStatus, setAnswersStatus] = useState<(boolean | null)[]>(flashcards.map(() => null));
    const navRef = useRef<HTMLUListElement>(null);

    // Reinicia o estado de respostas se os flashcards mudarem
    useEffect(() => {
        setAnswersStatus(flashcards.map(() => null));
    }, [flashcards]);

    const handleStepClick = (index: number) => {
        setActiveStep(index);
    };

    const handleAnswer = (index: number, isCorrect: boolean) => {
        setAnswersStatus(prev => {
            const newStatus = [...prev];
            newStatus[index] = isCorrect;
            return newStatus;
        });
    };



    return (
        <div>
            {/* Área dos números com setas de navegação */}
            <div className="stepper-nav-wrapper">
                <div className="row">

                <div className="stepper-nav-container">
                    <ul className="nav nav-pills mb-4 stepper-nav" ref={navRef}>
                        {flashcards.map((_, index) => (
                            <li className="nav-item" key={index}>
                                <button
                                    className={`nav-link ${index === activeStep ? 'active' : ''}`}
                                    style={
                                        answersStatus[index] === true
                                            ? { backgroundColor: '#d4edda' }
                                            : answersStatus[index] === false
                                                ? { backgroundColor: '#f8d7da' }
                                                : {}
                                    }
                                    onClick={() => handleStepClick(index)}
                                >
                                    {`${index + 1}`}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>


        </div>

            {/* Conteúdo do flashcard ativo */}
            <div className="tab-content">
                {flashcards.map((flashcard, index) => (
                    <div
                        key={index}
                        className={`tab-pane fade ${index === activeStep ? 'show active' : ''}`}
                    >
                        {flashcard.cardImage ? (
                            <FlashCardWithImage
                                question={flashcard.question}
                                answer={flashcard.answer}
                                incorrectAnswerA={flashcard.incorrectAnswerA}
                                incorrectAnswerB={flashcard.incorrectAnswerB}
                                incorrectAnswerC={flashcard.incorrectAnswerC}
                                incorrectAnswerD={flashcard.incorrectAnswerD}
                                rating={flashcard.rating}
                                cardImage={flashcard.cardImage}
                                onAnswer={(isCorrect: boolean) => handleAnswer(index, isCorrect)}
                            />
                        ) : (
                            <FlashCardNoImage
                                question={flashcard.question}
                                answer={flashcard.answer}
                                incorrectAnswerA={flashcard.incorrectAnswerA}
                                incorrectAnswerB={flashcard.incorrectAnswerB}
                                incorrectAnswerC={flashcard.incorrectAnswerC}
                                incorrectAnswerD={flashcard.incorrectAnswerD}
                                rating={flashcard.rating}
                                onAnswer={(isCorrect: boolean) => handleAnswer(index, isCorrect)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashCardStepper;
