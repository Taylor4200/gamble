// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CasinoPage from "./pages/CasinoPage";
// import other pages as needed...

export default function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/casino" element={<CasinoPage />} />
                    {/* Define more routes as needed */}
                </Routes>
            </Layout>
        </Router>
    );
}