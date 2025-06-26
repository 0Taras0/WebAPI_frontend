import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router";
import DashboardHome from "./pages/Dashboard/DashboardHome.tsx";
import NotFound from "./pages/OtherPage/NotFound.tsx";
import CategoriesListPage from "./pages/Categories";
import UserHomePage from "./pages/OtherPage/UserHomePage.tsx";
import UserLayout from "./layout/User/UserLayout.tsx";
import AdminLayout from "./layout/Admin/AdminLayout.tsx";
import CategoriesCreatePage from "./pages/Categories/create";
import CategoriesEditPage from "./pages/Categories/edit";
import LoginPage from "./pages/Account/Login";
import RequireAdmin from "./components/ProtectedRoute/RequireAdmin.tsx";
import RegistrationPage from "./pages/Account/Register";
import ProductsPage from "./pages/Products/List/ProductsPage.tsx";
import AdminProductListPage from "./pages/Products/Admin/List/AdminProductListPage.tsx";
import AdminProductCreatePage from "./pages/Products/Admin/Create/AdminProductCreatePage.tsx";

const App: React.FC = () => {
    console.log("App rendered");

    return (
        <>
            <Router>
                <Routes>
                    {/*<Route index element={<UserLayout>}></Route>*/}

                    <Route path="/" element={<UserLayout/>}>
                        <Route index element={<UserHomePage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="register" element={<RegistrationPage/>}/>
                        <Route path="products" element={<ProductsPage/>}/>
                    </Route>


                    <Route path="admin" element={<RequireAdmin/>}>
                        <Route element={<AdminLayout/>}>
                            <Route path="home" element={<DashboardHome/>}/>

                            <Route path="categories">
                                <Route index element={<CategoriesListPage/>}/>
                                <Route path={'create'} element={<CategoriesCreatePage/>}/>
                                <Route path={'edit/:id'} element={<CategoriesEditPage/>}/>
                            </Route>

                            <Route path="products">
                                <Route index element={<AdminProductListPage/>}></Route>
                                <Route path={'create'} element={<AdminProductCreatePage/>}/>
                            </Route>
                        </Route>
                    </Route>


                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App