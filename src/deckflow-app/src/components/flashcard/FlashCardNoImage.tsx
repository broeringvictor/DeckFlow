﻿import React, { useState, useEffect } from 'react';
import './FlashCard.css';

interface FlashCardProps {
    question: string;
    answer: string;
    incorrectAnswerA: string;
    incorrectAnswerB: string;
    incorrectAnswerC: string;
    incorrectAnswerD: string;
    rating: number;
    onAnswer?: (isCorrect: boolean) => void;
}

const FlashCardNoImage: React.FC<FlashCardProps> = ({
                                                        question,
                                                        answer,
                                                        incorrectAnswerA,
                                                        incorrectAnswerB,
                                                        incorrectAnswerC,
                                                        incorrectAnswerD,
                                                        rating,
                                                        onAnswer,
                                                    }) => {
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const letterLabels = ['a)', 'b)', 'c)', 'd)', 'e)'];

    const shuffleArray = (array: string[]): string[] => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        const answers = [answer, incorrectAnswerA, incorrectAnswerB, incorrectAnswerC, incorrectAnswerD];
        setShuffledAnswers(shuffleArray(answers));
    }, [answer, incorrectAnswerA, incorrectAnswerB, incorrectAnswerC, incorrectAnswerD]);

    const handleAnswerClick = (selected: string) => {
        setSelectedAnswer(selected);
        const isCorrect = selected === answer;
        setFeedback(isCorrect ? "Correto!" : "Incorreto!");
        if (onAnswer) {
            onAnswer(isCorrect);
        }
    };

    return (
        <div className="flashcard">
            <div className="flashcard-body">
                <span className="badge text-bg-primary rounded-pill">Rating: {rating} </span>
                <p className="card-text">{question}</p>

            </div>
            <ul className="flashcard-list">
                {shuffledAnswers.map((ans, index) => (
                    <li
                        key={index}
                        className={`flashcard-list-item ${
                            selectedAnswer === ans ? (ans === answer ? 'correct' : 'incorrect') : ''
                        }`}
                        onClick={() => handleAnswerClick(ans)}
                    >
                        {letterLabels[index]} {ans}
                    </li>
                ))}
            </ul>
            {feedback && (
                <div className="feedback">
                    <p>{feedback}</p>
                </div>
            )}
        </div>
    );
};

export default FlashCardNoImage;
