import './App.css';
import CategoriesPage from "./pages/categories";
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import CategoriesAdd from "./pages/categories/Add/CategoriesAdd";
import Footer from "./components/Footer";
import HomePage from "./pages/Home/Home";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import CategoriesEdit from "./pages/categories/Edit/CategoriesEdit";
import LoginPage from "./pages/account/Login/LoginPage";
import {useAuthStore} from "./store/useAuthStore";
import {jwtDecode} from "jwt-decode";
import {useEffect} from "react";
import RegisterPage from "./pages/account/Register/RegisterPage";
import ProductsPage from "./pages/products/Products";
import ProductPage from "./pages/products/product/Product";
import ProductCreatePage from "./pages/products/Create/ProductCreatePage";
import ProductEditPage from "./pages/products/Edit/ProductEditPage";
import {useCartStore} from "./store/cartStore";
import {pem as jwt} from "node-forge";
import ProfilePage from "./pages/account/Profile/ProfilePage";

const App = () => {

    const { setUser } = useAuthStore((state) => state);

    const loadCart = useCartStore((state) => state.loadCart);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("jwt");
            if (token) {
                const decoded = jwt.decode(token);
                await setUser(decoded);
            }
            await loadCart();
        }
        catch (error) {
            console.log(error);
        }
    }

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
                            <Route path="/categories/edit/:id" element={<CategoriesEdit />} />
                            <Route path="/login" element={<LoginPage/>} />
                            <Route path="/register" element={<RegisterPage/>} />
                            <Route path="/profile" element={<ProfilePage/>} />
                            <Route path={"products"}>
                                <Route index element={<ProductsPage></ProductsPage>} />
                                <Route path={"product/:id"} element={<ProductPage></ProductPage>} />
                                <Route path={"create"} element={<ProductCreatePage></ProductCreatePage>} />
                                <Route path={"edit/:id"} element={<ProductEditPage></ProductEditPage>} />
                            </Route>
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
