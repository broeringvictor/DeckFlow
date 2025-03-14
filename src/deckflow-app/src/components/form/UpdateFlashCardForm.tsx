import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export interface FlashcardFormData {
    question: string;
    answer: string;
    incorrectAnswerA: string;
    incorrectAnswerB: string;
    incorrectAnswerC: string;
    incorrectAnswerD: string;
    cardImage: string;
    categoryId?: number;
    rating: number;
}

interface FlashcardFormProps {
    defaultValues: FlashcardFormData;
    onSubmit: SubmitHandler<FlashcardFormData>;
}

const UpdateFlashcardForm: React.FC<FlashcardFormProps> = ({ defaultValues, onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FlashcardFormData>({ defaultValues });

    // Atualiza os valores do formulário sempre que os defaultValues mudam
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="question">Question</label>
                <input
                    id="question"
                    type="text"
                    className="form-control"
                    {...register("question", { required: "Question is required" })}
                />
                {errors.question && <span className="text-danger">{errors.question.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="answer">Answer</label>
                <input
                    id="answer"
                    type="text"
                    className="form-control"
                    {...register("answer", { required: "Answer is required" })}
                />
                {errors.answer && <span className="text-danger">{errors.answer.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="incorrectAnswerA">Incorrect Answer A</label>
                <input
                    id="incorrectAnswerA"
                    type="text"
                    className="form-control"
                    {...register("incorrectAnswerA")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="incorrectAnswerB">Incorrect Answer B</label>
                <input
                    id="incorrectAnswerB"
                    type="text"
                    className="form-control"
                    {...register("incorrectAnswerB")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="incorrectAnswerC">Incorrect Answer C</label>
                <input
                    id="incorrectAnswerC"
                    type="text"
                    className="form-control"
                    {...register("incorrectAnswerC")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="incorrectAnswerD">Incorrect Answer D</label>
                <input
                    id="incorrectAnswerD"
                    type="text"
                    className="form-control"
                    {...register("incorrectAnswerD")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="cardImage">Card Image URL</label>
                <input
                    id="cardImage"
                    type="text"
                    className="form-control"
                    {...register("cardImage")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="categoryId">Category ID</label>
                <input
                    id="categoryId"
                    type="number"
                    className="form-control"
                    {...register("categoryId", { valueAsNumber: true })}
                />
            </div>

            {/* Se o campo rating não for editado pelo usuário, pode ser enviado como hidden */}
            <input type="hidden" {...register("rating", { valueAsNumber: true })} />

            <button type="submit" className="btn btn-primary mt-3">Atualizar</button>
        </form>
    );
};

export default UpdateFlashcardForm;
