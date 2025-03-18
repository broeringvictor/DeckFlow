import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import App from "./pages/Home/App.tsx";
import Study from "./pages/Study/Study.tsx";
import Navbar from "./layouts/Navbar.tsx";

import CategoryPage from "./pages/Category/CategoryPage";

import ConfigurationPage from "./pages/Configuration/ConfigurationPage.tsx";
import AllFlashCardsPage from "./pages/flashCard/AllFlashCardsPage.tsx";
import EditFlashCardPage from "./pages/flashCard/EditFlashCardPage.tsx";
import CreateFlashCardPage from "./pages/flashCard/CreateFlashCardPage.tsx"; // Import da página de edição

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element (#root) not found in the DOM");
}

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/study" element={<Study />} />
            <Route path="/flashcards" element={<AllFlashCardsPage />} />
            <Route path="/flashcards/:id" element={<EditFlashCardPage />} />
            <Route path="/flashcards/criar" element={<CreateFlashCardPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/configuration" element={<ConfigurationPage />} />
        </Routes>
    </BrowserRouter>
);
