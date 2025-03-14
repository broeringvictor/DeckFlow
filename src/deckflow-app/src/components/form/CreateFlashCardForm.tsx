import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFlashCard } from "../../hooks/flashcard";
import { CreateFlashCardDto } from "../../entity/FlashCard/CreateFlashCardDto";

const CreateFlashCardForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFlashCardDto>();
    const navigate = useNavigate();
    const { addFlashCard } = useFlashCard();

    // Função auxiliar para garantir que valores vazios sejam strings e não null
    const normalizeString = (value?: string) => value?.trim() || "";

    const onSubmit: SubmitHandler<CreateFlashCardDto> = async (data) => {
        const payload: CreateFlashCardDto = {
            question: normalizeString(data.question),
            answer: normalizeString(data.answer),
            incorrectAnswerA: normalizeString(data.incorrectAnswerA),
            incorrectAnswerB: normalizeString(data.incorrectAnswerB),
            incorrectAnswerC: normalizeString(data.incorrectAnswerC),
            incorrectAnswerD: normalizeString(data.incorrectAnswerD),
            cardImage: normalizeString(data.cardImage),
            categoryId: Number(data.categoryId),
        };

        try {
            await addFlashCard(payload);
            navigate("/flashcards");
        } catch (error) {
            console.error("Erro ao criar flashcard:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Criar Novo FlashCard</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Campos de Pergunta e Resposta */}
                {[
                    { label: "Pergunta", name: "question", requiredMsg: "A pergunta é obrigatória" },
                    { label: "Resposta Correta", name: "answer", requiredMsg: "A resposta é obrigatória" }
                ].map(({ label, name, requiredMsg }) => (
                    <div className="mb-3" key={name}>
                        <label className="form-label">{label}</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register(name as keyof CreateFlashCardDto, { required: requiredMsg })}
                        />
                        {errors[name as keyof CreateFlashCardDto] && (
                            <span className="text-danger">{errors[name as keyof CreateFlashCardDto]?.message}</span>
                        )}
                    </div>
                ))}

                {/* Campos de Respostas Incorretas */}
                <div className="mb-3">
                    <label className="form-label">Respostas Incorretas</label>
                    {["incorrectAnswerA", "incorrectAnswerB", "incorrectAnswerC", "incorrectAnswerD"].map((name, index) => (
                        <input
                            key={name}
                            type="text"
                            className="form-control mt-2"
                            placeholder={`Resposta Incorreta ${String.fromCharCode(65 + index)}`}
                            {...register(name as keyof CreateFlashCardDto)}
                        />
                    ))}
                </div>

                {/* Campo para URL da Imagem */}
                <div className="mb-3">
                    <label className="form-label">Imagem do Card (URL)</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cole a URL da imagem"
                        {...register("cardImage")}
                    />
                </div>

                {/* Seleção de Categoria */}
                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <select className="form-select" {...register("categoryId", { required: "Selecione uma categoria" })}>
                        <option value="0">Selecione uma categoria</option>
                        <option value="2">Única</option>
                    </select>
                    {errors.categoryId && <span className="text-danger">{errors.categoryId.message}</span>}
                </div>

                <button type="submit" className="btn btn-success">Criar FlashCard</button>
            </form>
        </div>
    );
};

export default CreateFlashCardForm;
