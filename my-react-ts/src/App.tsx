import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router";
import React, { Suspense, lazy } from "react";

// Ліниві імпорти компонентів
const LoadingScreen = lazy(() => import("./components/ui/loading/LoadingScreen.tsx"));
const DashboardHome = lazy(() => import("./pages/Dashboard/DashboardHome.tsx"));
const NotFound = lazy(() => import("./pages/OtherPage/NotFound.tsx"));
const CategoriesListPage = lazy(() => import("./pages/Categories"));
const CategoriesCreatePage = lazy(() => import("./pages/Categories/create"));
const CategoriesEditPage = lazy(() => import("./pages/Categories/edit"));
const UserHomePage = lazy(() => import("./pages/OtherPage/UserHomePage.tsx"));
const UserLayout = lazy(() => import("./layout/User/UserLayout.tsx"));
const AdminLayout = lazy(() => import("./layout/Admin/AdminLayout.tsx"));
const LoginPage = lazy(() => import("./pages/Account/Login"));
const RegistrationPage = lazy(() => import("./pages/Account/Register"));
const ForgotPasswordPage = lazy(() => import("./pages/Account/ForgotPassword"));
const ForgotSuccessPage = lazy(() => import("./pages/Account/ForgotSuccess/ForgotSuccess.tsx"));
const ResetPasswordPage = lazy(() => import("./pages/Account/ResetPassword"));
const ProductsPage = lazy(() => import("./pages/Products/List/ProductsPage.tsx"));
const AdminProductListPage = lazy(() => import("./admin/pages/products/List/AdminProductListPage.tsx"));
const AdminProductCreatePage = lazy(() => import("./admin/pages/products/Create/AdminProductCreatePage.tsx"));
const UserListPage = lazy(() => import("./admin/pages/users/list"));
const UserEditPage = lazy(() => import("./admin/pages/users/edit/UserEditPage.tsx"));
const RequireAdmin = lazy(() => import("./components/ProtectedRoute/RequireAdmin.tsx"));


const App: React.FC = () => {
    console.log("App rendered");

    return (
        <>
            <Router>
                <Suspense fallback={<LoadingScreen></LoadingScreen>}>
                    <Routes>
                        <Route path="/" element={<UserLayout />}>
                            <Route index element={<UserHomePage />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="forgot-password" element={<ForgotPasswordPage />} />
                            <Route path="forgot-success" element={<ForgotSuccessPage />} />
                            <Route path="reset-password" element={<ResetPasswordPage />} />
                            <Route path="register" element={<RegistrationPage />} />
                            <Route path="products" element={<ProductsPage />} />
                        </Route>

                        <Route path="admin" element={<RequireAdmin />}>
                            <Route element={<AdminLayout />}>
                                <Route path="home" element={<DashboardHome />} />

                                <Route path="categories">
                                    <Route index element={<CategoriesListPage />} />
                                    <Route path="create" element={<CategoriesCreatePage />} />
                                    <Route path="edit/:id" element={<CategoriesEditPage />} />
                                </Route>

                                <Route path="products">
                                    <Route index element={<AdminProductListPage />} />
                                    <Route path="create" element={<AdminProductCreatePage />} />
                                </Route>

                                <Route path="users">
                                    <Route index element={<UserListPage />} />
                                    <Route path="edit/:id" element={<UserEditPage />} />
                                </Route>
                            </Route>
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    )
}

export default App