import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./pages/Home/App.tsx";
import Study from "./pages/Study/Study.tsx";
import Navbar from "./layouts/Navbar.tsx";
import AllFlashCardsPage from "./pages/FlashCard/AllFlashCardsPage";
import EditFlashCardPage from "./pages/FlashCard/EditFlashCardPage";
import CategoryPage from "./pages/Category/CategoryPage";
import CreateFlashCardPage from "./pages/FlashCard/CreateFlashCardPage.tsx"; // Import da página de edição

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/study" element={<Study />} />
            <Route path="/flashcards" element={<AllFlashCardsPage />} />
            <Route path="/flashcards/:id" element={<EditFlashCardPage />} />
            <Route path="/flashcards/criar" element={<CreateFlashCardPage />} />
            <Route path="/category" element={<CategoryPage/>} />

        </Routes>
    </BrowserRouter>
);
