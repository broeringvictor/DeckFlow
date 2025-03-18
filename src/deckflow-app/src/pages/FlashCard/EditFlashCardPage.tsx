import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useFlashCard} from "../../hooks/flashcard";

import "./EditFlashCardPage.css";
// Certifique-se de que o nome do componente está correto

import {FlashCardNoImage} from "../../components/FlashCard";
import  { FlashCardWithImage } from "../../components/FlashCard";
import {UpdateFlashCardFormDataType} from "../../components/Form/UpdateFlashCardFormDataType.ts";
import UpdateFlashCardForm from "../../components/Form/UpdateFlashCardForm.tsx";









const EditFlashCardPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getFlashCardById, editFlashCard } = useFlashCard();

    const [defaultValues, setDefaultValues] = useState<UpdateFlashCardFormDataType>({
        question: "",
        answer: "",
        incorrectAnswerA: "",
        incorrectAnswerB: "",
        incorrectAnswerC: "",
        incorrectAnswerD: "",
        cardImage: undefined, 
        categoryId: 0, 
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
                            cardImage: flashCard.cardImage || undefined, // Ou ""
                            categoryId: flashCard.categoryId || 0, // Garanta que seja número
                            rating: flashCard.rating || 0,
                        });
                    }
                } catch (error) {
                    console.error("Erro ao carregar FlashCard para edição:", error);
                }
            })();
        }
    }, [id, getFlashCardById]);

    const handleEditFlashCard = useCallback(
        async (data: UpdateFlashCardFormDataType) => {
            try {
                await editFlashCard({ id: Number(id), ...data });
                alert("flashCard atualizado com sucesso!");
                navigate("/flashcards");
            } catch (error) {
                console.error("Erro ao atualizar FlashCard:", error);
                alert("Erro ao atualizar FlashCard.");
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
                <UpdateFlashCardForm defaultValues={defaultValues} onSubmit={handleEditFlashCard} />
                </div>
            </div>
        </div>
    );
};

export default EditFlashCardPage;
