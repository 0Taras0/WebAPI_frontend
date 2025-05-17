import './App.css';
import CategoriesPage from "./pages/categories";
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import CategoriesAdd from "./pages/categories/add";
import Footer from "./components/Footer";
import HomePage from "./components/Home";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    return (
        <>
            <div className="d-flex container flex-column min-vh-100">
                <Navbar />

                <main className="flex-grow-1">
                    <div className="container mt-4">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/categories" element={<CategoriesPage />} />
                            <Route path="/categories/add" element={<CategoriesAdd />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    );
};


export default App;
