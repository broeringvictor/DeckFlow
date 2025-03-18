import {useState} from "react";
import {Button, Modal} from 'react-bootstrap';
import {useCreateCategory, useDeleteCategory, useGetAllCategory, useUpdateCategory,} from "../../hooks/Category";

import "./CategoryPage.css"; // Arquivo CSS para estilização

const CategoryPage = () => {
    // Estados
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ title: "", description: "" });

    // Hooks
    const { categories, loading: loadingAll, error: errorAll, refetch } = useGetAllCategory();
    const { createCategory, loading: creating, error: errorCreating } = useCreateCategory();
    const { updateCategory, loading: updating, error: errorUpdating } = useUpdateCategory();
    const { deleteCategory, loading: deleting, error: errorDeleting } = useDeleteCategory();

    // Handlers
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (selectedId) {
                await updateCategory({
                    id: selectedId,
                    ...form
                });
            } else {
                await createCategory(form);
            }
            resetForm();
            refetch();
        } catch (error) {
            console.error("Operation failed:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
            await deleteCategory(id);
            refetch();
        }
    };

    const resetForm = () => {
        setForm({ title: "", description: "" });
        setSelectedId(null);
        setShowModal(false);
    };

    // Renderização
    return (
        <div className="container">
            <h1>Gerenciamento de Categorias</h1>

            <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="mb-3"
            >
                Nova Categoria
            </Button>

            {errorAll && <div className="error">Erro: {errorAll}</div>}
            {errorDeleting && <div className="error">Erro ao excluir: {errorDeleting}</div>}

            <table className="category-table">
                <thead>
                <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {loadingAll ? (
                    <tr>
                        <td colSpan={3}>Carregando categorias...</td>
                    </tr>
                ) : categories?.map((cat) => (
                    <tr key={cat.id}>
                        <td>{cat.title}</td>
                        <td>{cat.description}</td>
                        <td>
                            <Button
                                variant="warning"
                                size="sm"
                                onClick={() => {
                                    setForm(cat);
                                    setSelectedId(cat.id);
                                    setShowModal(true);
                                }}
                                className="me-2"
                            >
                                Editar
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(cat.id)}
                                disabled={deleting}
                            >
                                {deleting ? "Excluindo..." : "Excluir"}
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showModal && (
                <Modal show={showModal} onHide={resetForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {selectedId ? "Editar Categoria" : "Nova Categoria"}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Título:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.title}
                                    onChange={(e) => setForm({...form, title: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descrição:</label>
                                <textarea
                                    className="form-control"
                                    value={form.description}
                                    onChange={(e) => setForm({...form, description: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={resetForm}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={creating || updating}
                                >
                                    {selectedId
                                        ? (updating ? "Salvando..." : "Salvar Alterações")
                                        : (creating ? "Criando..." : "Criar Categoria")}
                                </Button>
                            </div>

                            {errorCreating && <div className="alert alert-danger mt-3">{errorCreating}</div>}
                            {errorUpdating && <div className="alert alert-danger mt-3">{errorUpdating}</div>}
                        </form>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default CategoryPage;