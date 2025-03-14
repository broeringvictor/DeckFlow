// CreateFlashcardPage.tsx
import { useFlashCard } from "../../hooks/flashcard";
import { SubmitHandler } from "react-hook-form";
import CreateFlashcardForm, { CreateFlashcardFormData } from "../../components/form/CreateFlashCardForm";
import { useNavigate } from "react-router-dom";

const CreateFlashcardPage = () => {
    const { addFlashCard } = useFlashCard();
    const navigate = useNavigate();

    const handleCreateSubmit: SubmitHandler<CreateFlashcardFormData> = async (formData) => {
        try {
            await addFlashCard({
                ...formData,
                cardImage: formData.cardImage || null // Correção na sintaxe
            });

            alert("FlashCard criado com sucesso!");
            navigate("/flashcards");
        } catch (error) {
            console.error("Erro ao criar flashcard:", error);
            alert("Erro ao criar flashcard.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Criar Novo Flashcard</h1>
            <CreateFlashcardForm onSubmit={handleCreateSubmit} />
        </div>
    );
};

export default CreateFlashcardPage;