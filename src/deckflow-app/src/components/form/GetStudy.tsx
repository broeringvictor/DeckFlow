import React, { useState } from "react";

interface GetStudyProps {
    onSubmit: (categoryId: number, numberOfCards: number) => void; // Callback ao submeter o formulário
    defaultCategoryId?: number; // Valor padrão para a categoria
    defaultNumberOfCards?: number; // Valor padrão para o número de cartões
}

const GetStudy: React.FC<GetStudyProps> = ({
                                               onSubmit,
                                               defaultCategoryId = 0,
                                               defaultNumberOfCards = 10,
                                           }) => {
    const [categoryId, setCategoryId] = useState(defaultCategoryId);
    const [numberOfCards, setNumberOfCards] = useState(defaultNumberOfCards);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryId(Number(event.target.value)); // Atualiza o estado da categoria
    };

    const handleNumberOfCardsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfCards(Number(event.target.value)); // Atualiza o estado do número de cartões
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Previne comportamento padrão do formulário
        onSubmit(categoryId, numberOfCards); // Callback com os dados do formulário
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="categoryIdInput" className="form-label">
                    Category ID
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="categoryIdInput"
                    value={categoryId} // Controla o valor do input da categoria
                    onChange={handleCategoryChange} // Atualiza o estado ao modificar o input
                />
            </div>
            <div className="mb-3">
                <label htmlFor="numberOfCardsInput" className="form-label">
                    Number of Cards
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="numberOfCardsInput"
                    value={numberOfCards} // Controla o valor do input do número de cartões
                    onChange={handleNumberOfCardsChange} // Atualiza o estado ao modificar o input
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default GetStudy;