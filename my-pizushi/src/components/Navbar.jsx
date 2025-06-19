import React, {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {useAuthStore} from "../store/useAuthStore";
import {BASE_URL} from "../api/apiConfig";
import {useCartStore} from "../store/cartStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal} from "antd";
import {NavLink} from "react-bootstrap";

const Navbar = () => {
    const navigate = useNavigate();


    const items = useCartStore((state) => state.items);

    const [isCartModalVisible, setIsCartModalVisible] = useState(false);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);

    const { user, logout } = useAuthStore((state) => state);


    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const showCartModal = (id) => {
        setIsCartModalVisible(true);
    };

    const handleCartModalOk = () => {
        handleCartModalCancel();
    };

    const handleCartModalCancel = () => {
        setIsCartModalVisible(false);
    };

    const handleIncrement = (productId, quantity) => {
        addItem(productId, quantity + 1);
    };

    const handleDecrement = (productId, quantity) => {
        if (quantity > 1) {
            addItem(productId, quantity - 1);
        } else {
            console.log("REMOVE");
            removeItem(productId);
        }
    };

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
                        <li className="nav-item">
                            <Link to="/products" className='nav-link'>
                                Продукти
                            </Link>
                        </li>

                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link to={"/profile"}>
                                    <img src={`${BASE_URL}/images/50_${user.image}`} alt="Avatar" className="rounded-circle mx-3" />
                                    <span className={"mx-3 text-black"}>{user.email}</span>
                                </Link>

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

                                    <Link className="nav-link" to="/register">
                                        Реєстрація
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item position-relative">
                            <button onClick={showCartModal} className="btn btn-dark mb-2 mt-1 position-relative">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                {totalCount > 0 && (
                                    <span
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                        style={{ fontSize: "0.6rem" }}>
                                        {totalCount}
                                    </span>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
            <Modal
                title="Ваш кошик"
                open={isCartModalVisible}
                onOk={handleCartModalOk}
                onCancel={handleCartModalCancel}
                okText="Оформити"
                cancelText="Закрити"
                width={700}
            >
                {items.length === 0 ? (
                    <p>Кошик порожній</p>
                ) : (
                    <div>
                        {items.map(item => (
                            <div className="d-flex align-items-center mb-3 border-bottom pb-2">
                                <NavLink to={`products/product/${item.productId}`} onClick={()=>{setIsCartModalVisible(false)}}>
                                    <img src={`${BASE_URL}/images/200_${item.imageName}`} alt={item.name} width="50"  className="me-3"/>
                                </NavLink>

                                <div className="flex-grow-1">
                                    <div><strong>{item.name}</strong></div>
                                    <div className="text-muted">{item.categoryName}</div>
                                    <div>Ціна: {item.price} грн</div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Button onClick={() => handleDecrement(item.productId, item.quantity)}>-</Button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <Button onClick={() => handleIncrement(item.productId, item.quantity)}>+</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </nav>
    );
};

export default Navbar;
