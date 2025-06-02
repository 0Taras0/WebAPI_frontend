import React from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {useAuthStore} from "../store/useAuthStore";
import {BASE_URL} from "../api/apiConfig";

const Navbar = () => {
    const {user, logout} = useAuthStore(state => state);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();

        navigate('/');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold text-danger" to="/">
                    🍕 OldPizzeria
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Головна
                            </Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Категорії
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/categories">
                                        Переглянути
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/categories/add">
                                        Додати
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {user ? (
                            <div className="flex items-center gap-2">
                                <img src={`${BASE_URL}/images/50_${user.image}`} alt="Avatar" className="rounded-circle mx-3" />
                                <span className={"mx-3 text-black"}>{user.email}</span>
                                <button className={"mx-3 btn btn btn-light"} onClick={handleLogout}>Вийти</button>
                            </div>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Вхід
                                    </Link>
                                </li>
                                <li className="nav-item">

                                    <Link className="nav-link" to="/signup">
                                        Реєстрація
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
            <Outlet />
        </nav>
    );
};

export default Navbar;
