import React, { useEffect } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import useWebSearch from "../../hooks/DeepSeek/useWebSearch.ts";
import useIncorrectCreateAnswerDS from "../../hooks/DeepSeek/useIncorrectCreateAnswerDS.ts";

// Definindo o tipo específico para o formulário de criação
export type CreateFlashcardFormData = {
    question: string;
    answer: string;
    incorrectAnswerA: string;
    incorrectAnswerB: string;
    incorrectAnswerC: string;
    incorrectAnswerD: string;
    cardImage: string | null;
    categoryId: number;
};

interface Props {
    onSubmit: SubmitHandler<CreateFlashcardFormData>;
}

const CreateFlashcardForm: React.FC<Props> = ({ onSubmit }) => {
    const {
        imageOptions, // Array de URLs de opções de imagem
        imageUrl,     // URL escolhida
        loading: imageLoading,
        error: imageError,
        searchImage,
        chooseImageOption,
    } = useWebSearch();

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<CreateFlashcardFormData>({
        defaultValues: {
            question: "",
            answer: "",
            incorrectAnswerA: "",
            incorrectAnswerB: "",
            incorrectAnswerC: "",
            incorrectAnswerD: "",
            cardImage: null,
            categoryId: 2,
        },
    });

    const { loading, incorrectAnswers, generateAnswers } = useIncorrectCreateAnswerDS();

    const question = useWatch({ control, name: "question" });
    const correctAnswer = useWatch({ control, name: "answer" });

    // Atualiza o campo `cardImage` quando `imageUrl` mudar
    useEffect(() => {
        if (imageUrl) setValue("cardImage", imageUrl);
    }, [imageUrl, setValue]);

    // Atualiza respostas incorretas quando recebidas
    useEffect(() => {
        if (incorrectAnswers.length === 4) {
            setValue("incorrectAnswerA", incorrectAnswers[0]);
            setValue("incorrectAnswerB", incorrectAnswers[1]);
            setValue("incorrectAnswerC", incorrectAnswers[2]);
            setValue("incorrectAnswerD", incorrectAnswers[3]);
        }
    }, [incorrectAnswers, setValue]);

    // Função: Gera respostas incorretas via IA
    const handleGenerateAnswers = async () => {
        if (question && correctAnswer) {
            await generateAnswers(question, correctAnswer);
        }
    };

    // Função: Pesquisa imagens com base na questão e resposta correta
    const handleImageSearch = async () => {
        if (question && correctAnswer) {
            await searchImage(question, correctAnswer);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Campos principais */}
            <div className="form-group">
                <label htmlFor="question">Questão</label>
                <input
                    id="question"
                    type="text"
                    className="form-control"
                    {...register("question", { required: "Questão é obrigatória" })}
                />
                {errors.question && <span className="text-danger">{errors.question.message}</span>}

                <label htmlFor="answer" className="mt-3">Resposta Correta</label>
                <input
                    id="answer"
                    type="text"
                    className="form-control"
                    {...register("answer", { required: "Resposta correta é obrigatória" })}
                />
                {errors.answer && <span className="text-danger">{errors.answer.message}</span>}
            </div>

            {/* Botões de ação */}
            <div className="form-group mt-3">
                <button
                    type="button"
                    onClick={handleGenerateAnswers}
                    disabled={loading || !question || !correctAnswer}
                    className="btn btn-outline-secondary me-2"
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" />
                            Gerando Respostas...
                        </>
                    ) : (
                        "Gerar Respostas Incorretas"
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleImageSearch}
                    disabled={imageLoading || !question || !correctAnswer}
                    className="btn btn-outline-secondary"
                >
                    {imageLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" />
                            Pesquisando Imagens...
                        </>
                    ) : (
                        "Pesquisar Imagens"
                    )}
                </button>
            </div>

            {/* Respostas incorretas */}
            <div className="form-group mt-4">
                <label>Respostas Incorretas</label>
                <input type="text" className="form-control mb-2" {...register("incorrectAnswerA")} />
                <input type="text" className="form-control mb-2" {...register("incorrectAnswerB")} />
                <input type="text" className="form-control mb-2" {...register("incorrectAnswerC")} />
                <input type="text" className="form-control" {...register("incorrectAnswerD")} />
            </div>

            {/* Campo URL da imagem */}
            <div className="form-group mt-3">
                <label htmlFor="cardImage">Card Image URL</label>
                <input
                    id="cardImage"
                    type="text"
                    className="form-control"
                    {...register("cardImage")}
                />
            </div>

            {/* Opções de Imagens */}
            {imageOptions.length > 0 && (
                <div className="border p-3 mt-4">
                    <h5>Escolha uma das imagens encontradas:</h5>
                    <div className="row">
                        {imageOptions.map((optionUrl, index) => (
                            <div key={index} className="col-md-4 mt-2 d-flex flex-column align-items-center">
                                <img
                                    src={optionUrl}
                                    alt={`Opção ${index + 1}`}
                                    style={{ maxWidth: "100%", height: "150px", objectFit: "cover" }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary mt-2"
                                    onClick={() => chooseImageOption(optionUrl)}
                                >
                                    Escolher Imagem
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Imagem selecionada */}
            {imageUrl && (
                <div className="mt-4">
                    <h5>Imagem Selecionada:</h5>
                    <img src={imageUrl} alt="Imagem Escolhida" style={{ maxWidth: "200px", height: "auto" }} />
                </div>
            )}

            {/* Categoria */}
            <div className="form-group mt-4">
                <label htmlFor="categoryId">Category ID</label>
                <input
                    id="categoryId"
                    type="number"
                    className="form-control"
                    {...register("categoryId", { required: "Category ID é obrigatório", valueAsNumber: true })}
                />
                {errors.categoryId && <span className="text-danger">{errors.categoryId.message}</span>}
            </div>

            {/* Botão de Submit */}
            <button type="submit" className="btn btn-primary mt-4">Criar Flashcard</button>

            {/* Mensagem de erro na busca de imagens */}
            {imageError && <p className="text-danger mt-2">Erro: {imageError}</p>}
        </form>
    );
};

export default CreateFlashcardForm;