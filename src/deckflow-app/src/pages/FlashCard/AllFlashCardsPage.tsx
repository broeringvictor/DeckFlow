// AllFlashCardsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFlashCard } from '../../hooks/flashcard';
import './AllFlashCardsPage.css';

const AllFlashCardsPage: React.FC = () => {
    const { flashCards, loading, error, removeFlashCard } = useFlashCard();

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm('Tem certeza que deseja deletar este flashcard?');
        if (confirmDelete) {
            try {
                await removeFlashCard(id);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>FlashCards</h2>
                <Link to="/flashcards/criar" className="btn btn-success">
                    Criar Novo FlashCard
                </Link>
            </div>
            {loading ? (
                <div>Carregando...</div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <table className="table table-bordered table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {flashCards.map((card) => (
                        <tr key={card.id}>
                            <td>{card.question}</td>
                            <td>{card.answer}</td>
                            <td>{card.categoryId}</td>
                            <td>{card.cardImage && <img className="card-img" src={card.cardImage} alt="Card Image" />}</td>
                            <td>
                                <div className="button-container">
                                    <Link to={`/flashcards/${card.id}`} className="btn btn-primary btn-sm">
                                        Editar
                                    </Link>
                                    <button onClick={() => handleDelete(card.id)} className="btn btn-danger btn-sm">
                                        Deletar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllFlashCardsPage;
