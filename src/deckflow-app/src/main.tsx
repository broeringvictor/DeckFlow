import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/Home/App.tsx";
import Study from "./pages/Study/Study.tsx";



const root = document.getElementById("root")

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/study" element={<Study />} />
        </Routes>
    </BrowserRouter>
);

