// CreateFlashcardForm.tsx

import React from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import useIncorrectCreateAnswerDS from "../../hooks/DeepSeek/useIncorrectCreateAnswerDS.ts";
import useWebSearch from "../../hooks/DeepSeek/useWebSearch.ts";

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
        imageOptions,      // Array de até 3 URLs (opções de imagem)
        imageUrl,          // URL escolhida
        loading: imageLoading,
        error: imageError,
        searchImage,
        chooseImageOption,
    } = useWebSearch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue
    } = useForm<CreateFlashcardFormData>({
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

    React.useEffect(() => {
        // Sempre que imageUrl mudar, atualiza o campo "cardImage" no formulário
        if (imageUrl) {
            setValue('cardImage', imageUrl);
        }
    }, [imageUrl, setValue]);

    const question = useWatch({ control, name: 'question' });
    const correctAnswer = useWatch({ control, name: 'answer' });

    const { loading, incorrectAnswers, generateAnswers } = useIncorrectCreateAnswerDS();

    React.useEffect(() => {
        if (incorrectAnswers.length === 4) {
            setValue('incorrectAnswerA', incorrectAnswers[0]);
            setValue('incorrectAnswerB', incorrectAnswers[1]);
            setValue('incorrectAnswerC', incorrectAnswers[2]);
            setValue('incorrectAnswerD', incorrectAnswers[3]);
        }
    }, [incorrectAnswers, setValue]);

    const handleGenerate = async () => {
        await generateAnswers(question, correctAnswer);
    };

    const handleImageSearch = async () => {
        console.log("handleImageSearch chamado");
        await searchImage(question, correctAnswer);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="question">Questão</label>
                <input
                    id="question"
                    type="text"
                    className="form-control"
                    {...register("question", { required: "Questão é obrigatória" })}
                />
                {errors.question && <span className="text-danger">{errors.question.message}</span>}

                <label htmlFor="answer">Resposta Correta</label>
                <input
                    id="answer"
                    type="text"
                    className="form-control"
                    {...register("answer", { required: "Resposta é obrigatória" })}
                />
                {errors.answer && <span className="text-danger">{errors.answer.message}</span>}

                {/* Botão para gerar respostas incorretas */}
                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={loading || !question || !correctAnswer}
                    className="btn btn-outline-secondary mt-2"
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" />
                            Gerando Respostas...
                        </>
                    ) : (
                        'Gerar Respostas Incorretas com IA'
                    )}
                </button>

                {/* Botão para buscar 3 imagens no Unsplash com IA */}

            </div>

            <div className="form-group">
                <label>Respostas Incorretas</label>
                <input type="text" className="form-control mb-2" {...register("incorrectAnswerA")} />
                <input type="text" className="form-control mb-2" {...register("incorrectAnswerB")} />
                <input type="text" className="form-control mb-2" {...register("incorrectAnswerC")} />
                <input type="text" className="form-control" {...register("incorrectAnswerD")} />
            </div>

            {/* Campo onde será armazenada a URL escolhida */}
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
            <button
                type="button"
                onClick={handleImageSearch}
                disabled={imageLoading || !question || !correctAnswer}
                className="btn btn-outline-secondary mt-2 ms-2"
            >
                {imageLoading ? (
                    <>
                        <span className="spinner-border spinner-border-sm" role="status" />
                        Pesquisando Imagens...
                    </>
                ) : (
                    'Pesquisar 3 Imagens'
                )}
            </button>
            </div>

            {/* Exibe as 3 opções de imagem caso existam */}
            {imageOptions.length > 0 && (
                <div className="border p-2 mt-3">
                    <h5>Escolha uma das imagens encontradas:</h5>
                    <div className="row">
                        {imageOptions.map((optionUrl, index) => (
                            <div key={index} className="col-md-4 mt-2 d-flex flex-column align-items-center">
                                <img
                                    src={optionUrl}
                                    alt={`Opção ${index + 1}`}
                                    style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary mt-2"
                                    onClick={() => {
                                        // define a imagem escolhida no hook,
                                        // consequentemente dispara o setValue('cardImage', ...).
                                        chooseImageOption(optionUrl);
                                    }}
                                >
                                    Escolher esta imagem
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Exibe a imagem final escolhida, se houver */}
            {imageUrl && (
                <div className="mt-3">
                    <h5>Imagem selecionada:</h5>
                    <img src={imageUrl} alt="Imagem escolhida" style={{ maxWidth: '200px', height: 'auto' }} />
                </div>
            )}

            <div className="form-group mt-3">
                <label htmlFor="categoryId">Category ID</label>
                <input
                    id="categoryId"
                    type="number"
                    className="form-control"
                    {...register("categoryId", {
                        required: "Category ID é obrigatório",
                        valueAsNumber: true
                    })}
                />
                {errors.categoryId && <span className="text-danger">{errors.categoryId.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary mt-3">
                Criar Flashcard
            </button>

            {/* Se houver erro na busca de imagens, exibe mensagem */}
            {imageError && <p className="text-danger mt-2">Erro: {imageError}</p>}
        </form>
    );
};

export default CreateFlashcardForm;
