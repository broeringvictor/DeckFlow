import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
    useCreateApiKeyConfiguration,
    useGetApiKeyConfiguration
} from "../../hooks/ApiKeyConfiguration";
import "./CategoryPage.css";

const ConfigurationPage = () => {
    // Estados
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState<{
        provider: "OpenAI" | "Deepseek"; // Ajustando o tipo literal aqui
        apiKey: string;
    }>({
        provider: "OpenAI", // Valor padrão inicial
        apiKey: "",
    });

    // Hooks
    const {
        getApiKeyConfiguration,
        loading: loadingKeys,
        error: errorKeys,
        apiKeys
    } = useGetApiKeyConfiguration();

    const {
        createApiKeyConfiguration,
        loading: creating,
        error: errorCreating
    } = useCreateApiKeyConfiguration();

    // Carregar configurações inicialmente
    useEffect(() => {
        getApiKeyConfiguration();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createApiKeyConfiguration(form);
            await getApiKeyConfiguration();
            resetForm();
        } catch (error) {
            console.error("Falha ao criar chave API:", error);
        }
    };

    const resetForm = () => {
        setForm({ provider: "OpenAI", apiKey: "" });
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
                    <th>OpenAI API Key</th>
                    <th>Deepseek API Key</th>
                </tr>
                </thead>
                <tbody>
                {loadingKeys ? (
                    <tr>
                        <td colSpan={2}>Carregando chaves...</td>
                    </tr>
                ) : apiKeys?.map((key) => (
                    <tr key={key.id}>
                        <td>{key.OpenAiApiKey}</td>
                        <td>{key.DeepseekApiKey}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={resetForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar Nova Chave API</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label>Provedor:</label>
                            <select
                                className="form-control"
                                value={form.provider}
                                onChange={(e) => setForm({ ...form, provider: e.target.value as "OpenAI" | "Deepseek" })}
                                required
                            >
                                <option value="OpenAI">OpenAI</option>
                                <option value="Deepseek">Deepseek</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <Form.Label>Chave API:</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.apiKey}
                                onChange={(e) => setForm({...form, apiKey: e.target.value})}
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

                        {errorCreating &&
                            <div className="alert alert-danger mt-3">
                                {errorCreating}
                            </div>
                        }
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ConfigurationPage;