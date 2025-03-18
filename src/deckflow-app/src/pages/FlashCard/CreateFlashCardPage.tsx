// CreateFlashcardPage.tsx
import {useFlashCard} from "../../hooks/flashcard";
import {SubmitHandler} from "react-hook-form";
import CreateFlashcardForm, {CreateFlashcardFormData} from "../../components/Form/CreateFlashCardForm";
import {useNavigate} from "react-router-dom";

const CreateFlashcardPage = () => {
    const { addFlashCard } = useFlashCard();
    const navigate = useNavigate();

    const handleCreateSubmit: SubmitHandler<CreateFlashcardFormData> = async (formData) => {
        try {
            await addFlashCard({
                ...formData,
                cardImage: formData.cardImage || undefined // Correção na sintaxe
            });

            alert("flashCard criado com sucesso!");
            navigate("/flashcards");
        } catch (error) {
            console.error("Erro ao criar FlashCard:", error);
            alert("Erro ao criar FlashCard.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Criar Flashcard</h1>
            <CreateFlashcardForm onSubmit={handleCreateSubmit} />
        </div>
    );
};

export default CreateFlashcardPage;