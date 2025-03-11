import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await fetch('http://localhost:5249/api/Study/GetFlashCards', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ categoryId: 2, numberOfCards: 10 })
                });
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                const data = await response.json();
                setFlashcards(data);
            } catch (error) {
                console.error('Erro ao buscar flashcards:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlashcards();
    }, []);

    if (loading) {
        return <div className="loading">Carregando flashcards...</div>;
    }

    return (
        <div className="container">
            <h1>Flashcards</h1>
            <div className="flashcards-grid">
                {flashcards.map(card => (
                    <div key={card.id} className="flashcard">
                        <h2>{card.question}</h2>
                        <p><strong>Resposta:</strong> {card.answer}</p>
                        <div className="incorrect-answers">
                            <p><strong>Opções incorretas:</strong></p>
                            <ul>
                                {card.incorrectAnswerA && <li>{card.incorrectAnswerA}</li>}
                                {card.incorrectAnswerB && <li>{card.incorrectAnswerB}</li>}
                                {card.incorrectAnswerC && <li>{card.incorrectAnswerC}</li>}
                                {card.incorrectAnswerD && <li>{card.incorrectAnswerD}</li>}
                            </ul>
                        </div>
                        {card.cardImage && (
                            <img src={card.cardImage} alt="Flashcard" className="card-image" />
                        )}
                        <div className="dates">
                            <p><small>Criado em: {new Date(card.createDate).toLocaleDateString()}</small></p>
                            <p><small>Atualizado em: {new Date(card.lastUpdateDate).toLocaleDateString()}</small></p>
                        </div>
                        <p><strong>Rating:</strong> {card.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
