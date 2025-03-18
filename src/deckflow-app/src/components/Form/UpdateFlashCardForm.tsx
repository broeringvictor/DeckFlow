import React, {useEffect} from "react";
import {SubmitHandler, useForm, useWatch} from "react-hook-form";
import useIncorrectCreateAnswerDS from "../../hooks/DeepSeek/useIncorrectCreateAnswerDS.ts";
import useWebSearch from "../../hooks/DeepSeek/useWebSearch.ts";
import {UpdateFlashCardFormDataType} from "./UpdateFlashCardFormDataType.ts";




interface UpdateFlashCardFormProps {
    defaultValues: UpdateFlashCardFormDataType;               // Valores iniciais vindos de fora
    onSubmit: SubmitHandler<UpdateFlashCardFormDataType>;     // Função a ser chamada no submit
}

const UpdateFlashCardForm: React.FC<UpdateFlashCardFormProps> = ({ defaultValues, onSubmit }) => {
    const {
        // Hook responsável pelas imagens
        imageOptions,
        imageUrl,
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
        setValue,
        reset,
    } = useForm<UpdateFlashCardFormDataType>({
        defaultValues,
    });

    // Hook que gera respostas incorretas
    const {
        loading,
        incorrectAnswers,
        generateAnswers,
    } = useIncorrectCreateAnswerDS();

    // Efeito para resetar o formulário sempre que defaultValues mudarem:
    // (assim que trocar de FlashCard, por exemplo)
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    // Sempre que imageUrl mudar no hook, atualiza o campo "cardImage" do Form
    useEffect(() => {
        if (imageUrl) {
            setValue("cardImage", imageUrl);
        }
    }, [imageUrl, setValue]);

    // Observa o valor de 'question' e 'answer' em tempo real
    const question = useWatch({ control, name: "question" });
    const correctAnswer = useWatch({ control, name: "answer" });

    // Ao receber respostas incorretas do hook, atualiza os campos no Form
    useEffect(() => {
        if (incorrectAnswers.length === 4) {
            setValue("incorrectAnswerA", incorrectAnswers[0]);
            setValue("incorrectAnswerB", incorrectAnswers[1]);
            setValue("incorrectAnswerC", incorrectAnswers[2]);
            setValue("incorrectAnswerD", incorrectAnswers[3]);
        }
    }, [incorrectAnswers, setValue]);

    // Função para gerar respostas incorretas (IA)
    const handleGenerate = async () => {
        await generateAnswers(question, correctAnswer);
    };

    // Função para pesquisar 3 imagens
    const handleImageSearch = async () => {
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
                {errors.question && (
                    <span className="text-danger">{errors.question.message}</span>
                )}

                <label htmlFor="answer">Resposta Correta</label>
                <input
                    id="answer"
                    type="text"
                    className="form-control"
                    {...register("answer", { required: "Resposta é obrigatória" })}
                />
                {errors.answer && (
                    <span className="text-danger">{errors.answer.message}</span>
                )}

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
                        "Gerar Respostas Incorretas com IA"
                    )}
                </button>
            </div>

            <div className="form-group">
                <label>Respostas Incorretas</label>
                <input
                    type="text"
                    className="form-control mb-2"
                    {...register("incorrectAnswerA")}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    {...register("incorrectAnswerB")}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    {...register("incorrectAnswerC")}
                />
                <input
                    type="text"
                    className="form-control"
                    {...register("incorrectAnswerD")}
                />
            </div>

            {/* Campo que representa a URL escolhida */}
            <div className="form-group">
                <label htmlFor="cardImage">Card Image URL</label>
                <input
                    id="cardImage"
                    type="text"
                    className="form-control"
                    {...register("cardImage")}
                />
            </div>

            {/* Botão que chama a pesquisa de imagens */}
            <div className="form-group">
                <button
                    type="button"
                    onClick={handleImageSearch}
                    disabled={imageLoading || !question || !correctAnswer}
                    className="btn btn-outline-secondary mt-2"
                >
                    {imageLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" />
                            Pesquisando Imagens...
                        </>
                    ) : (
                        "Pesquisar 3 Imagens"
                    )}
                </button>
            </div>

            {/* Exibe as 3 opções de imagem caso existam */}
            {imageOptions.length > 0 && (
                <div className="border p-2 mt-3">
                    <h5>Escolha uma das imagens encontradas:</h5>
                    <div className="row">
                        {imageOptions.map((optionUrl, index) => (
                            <div
                                key={index}
                                className="col-md-4 mt-2 d-flex flex-column align-items-center"
                            >
                                <img
                                    src={optionUrl}
                                    alt={`Opção ${index + 1}`}
                                    style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "cover" }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary mt-2"
                                    onClick={() => chooseImageOption(optionUrl)}
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
                    <img
                        src={imageUrl}
                        alt="Imagem escolhida"
                        style={{ maxWidth: "200px", height: "auto" }}
                    />
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
                        valueAsNumber: true,
                    })}
                />
                {errors.categoryId && (
                    <span className="text-danger">{errors.categoryId.message}</span>
                )}
            </div>

            <button type="submit" className="btn btn-primary mt-3">
                Atualizar Flashcard
            </button>

            {/* Se houver erro na busca de imagens, exibe mensagem */}
            {imageError && <p className="text-danger mt-2">Erro: {imageError}</p>}
        </form>
    );
};
export default UpdateFlashCardForm;

