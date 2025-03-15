import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import {
    useCreateApiKeyConfiguration,
    useGetApiKeyConfiguration
} from "../../hooks/ApiKeyConfiguration";
import "./CategoryPage.css"; // Reutilizando os estilos

const ConfigurationPage = () => {
    // Estados
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: "", key: "", permissions: "" });

    // Hooks
    const { getApiKeyConfiguration, loading: loadingKeys, error: errorKeys, apiKeys } = useGetApiKeyConfiguration();
    const { createApiKeyConfiguration, loading: creating, error: errorCreating } = useCreateApiKeyConfiguration();

    // Carregar configurações inicialmente
    useEffect(() => {
        getApiKeyConfiguration();
    }, []);

    // Handlers
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createApiKeyConfiguration(form);
            await getApiKeyConfiguration(); // Atualiza a lista
            resetForm();
        } catch (error) {
            console.error("Failed to create API key:", error);
        }
    };

    const resetForm = () => {
        setForm({ name: "", key: "", permissions: "" });
        setSelectedId(null);
        setShowModal(false);
    };

    return (
        <div className="container">
            <h1>Gerenciamento de Chaves API</h1>

            <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="mb-3"
            >
                Nova Chave API
            </Button>

            {errorKeys && <div className="error">Erro: {errorKeys}</div>}

            <table className="category-table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Chave</th>
                    <th>Permissões</th>
                </tr>
                </thead>
                <tbody>
                {loadingKeys ? (
                    <tr>
                        <td colSpan={3}>Carregando chaves...</td>
                    </tr>
                ) : apiKeys?.map((key) => (
                    <tr key={key.id}>
                        <td>{key.name}</td>
                        <td>{key.key}</td>
                        <td>{key.permissions}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={resetForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova Chave API</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label>Nome:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.name}
                                onChange={(e) => setForm({...form, name: e.target.value})}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Permissões:</label>
                            <textarea
                                className="form-control"
                                value={form.permissions}
                                onChange={(e) => setForm({...form, permissions: e.target.value})}
                                required
                            />
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={resetForm}>
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={creating}
                            >
                                {creating ? "Criando..." : "Criar Chave"}
                            </Button>
                        </div>

                        {errorCreating && <div className="alert alert-danger mt-3">{errorCreating}</div>}
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ConfigurationPage;