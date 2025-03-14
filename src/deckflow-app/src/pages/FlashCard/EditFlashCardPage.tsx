import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFlashCard } from "../../hooks/flashcard";

import "./EditFlashCardPage.css";
import UpdateFlashcardForm, { FlashcardFormData } from "../../components/form/UpdateFlashCardForm";
import FlashCardWithImage from "../../components/flashcard/FlashCardWithImage";
import FlashCardNoImage from "../../components/flashcard/FlashCardNoImage";

const EditFlashCardPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getFlashCardById, editFlashCard } = useFlashCard();

    const [defaultValues, setDefaultValues] = useState<FlashcardFormData>({
        question: "",
        answer: "",
        incorrectAnswerA: "",
        incorrectAnswerB: "",
        incorrectAnswerC: "",
        incorrectAnswerD: "",
        cardImage: "",
        categoryId: undefined,
        rating: 0,
    });

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const flashCard = await getFlashCardById(Number(id));
                    if (flashCard) {
                        setDefaultValues({
                            question: flashCard.question || "",
                            answer: flashCard.answer || "",
                            incorrectAnswerA: flashCard.incorrectAnswerA || "",
                            incorrectAnswerB: flashCard.incorrectAnswerB || "",
                            incorrectAnswerC: flashCard.incorrectAnswerC || "",
                            incorrectAnswerD: flashCard.incorrectAnswerD || "",
                            cardImage: flashCard.cardImage || "",
                            categoryId: flashCard.categoryId,
                            rating: flashCard.rating || 0,
                        });
                    }
                } catch (error) {
                    console.error("Erro ao carregar flashcard para edição:", error);
                }
            })();
        }
    }, [id, getFlashCardById]);

    const handleEditFlashCard = useCallback(
        async (data: FlashcardFormData) => {
            try {
                await editFlashCard({ id: Number(id), ...data });
                alert("FlashCard atualizado com sucesso!");
                navigate("/flashcards");
            } catch (error) {
                console.error("Erro ao atualizar flashcard:", error);
                alert("Erro ao atualizar flashcard.");
            }
        },
        [editFlashCard, id, navigate]
    );

    return (
        <div className="container edit-container">
            <h2 className="text-center">Editar FlashCard</h2>
            <div className="row">
                <div className="col-lg-4 mb-4">
                    {defaultValues && (
                        <>
                            {defaultValues.cardImage ? (
                                <FlashCardWithImage
                                    question={defaultValues.question}
                                    answer={defaultValues.answer}
                                    incorrectAnswerA={defaultValues.incorrectAnswerA}
                                    incorrectAnswerB={defaultValues.incorrectAnswerB}
                                    incorrectAnswerC={defaultValues.incorrectAnswerC}
                                    incorrectAnswerD={defaultValues.incorrectAnswerD}
                                    cardImage={defaultValues.cardImage}
                                    rating={defaultValues.rating}
                                    disabled={true}
                                />
                            ) : (
                                <FlashCardNoImage
                                    question={defaultValues.question}
                                    answer={defaultValues.answer}
                                    incorrectAnswerA={defaultValues.incorrectAnswerA}
                                    incorrectAnswerB={defaultValues.incorrectAnswerB}
                                    incorrectAnswerC={defaultValues.incorrectAnswerC}
                                    incorrectAnswerD={defaultValues.incorrectAnswerD}
                                    rating={defaultValues.rating}
                                    disabled={true}
                                />
                            )}
                        </>
                    )}
                </div>
                <div className="col-lg-8">
                    <UpdateFlashcardForm defaultValues={defaultValues} onSubmit={handleEditFlashCard} />
                </div>
            </div>
        </div>
    );
};

export default EditFlashCardPage;
