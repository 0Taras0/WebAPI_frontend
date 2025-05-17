import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-4 mt-5">
            <div className="container">
                <div className="row">

                    {/* Лого і назва */}
                    <div className="col-md-4 mb-3">
                        <h5 className="text-warning">🍕 OldPizzeria</h5>
                        <p>Смачна їжа швидко та зручно. Доставляємо щастя у кожен дім!</p>
                    </div>

                    {/* Навігація */}
                    <div className="col-md-4 mb-3">
                        <h6>Навігація</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none">Головна</Link></li>
                            <li><Link to="/categories" className="text-white text-decoration-none">Категорії</Link></li>
                            <li><Link to="/cart" className="text-white text-decoration-none">Кошик</Link></li>
                            <li><Link to="/contact" className="text-white text-decoration-none">Контакти</Link></li>
                        </ul>
                    </div>

                    {/* Контакти */}
                    <div className="col-md-4 mb-3">
                        <h6>Контакти</h6>
                        <p className="mb-1">📍 вулиця Шашкевича, 1, Тернопіль</p>
                        <p className="mb-1">📞 +38 (099) 123-45-67</p>
                        <p>✉️ support@oldpizzeria.ua</p>
                    </div>

                </div>

                <hr className="bg-secondary" />

                <div className="text-center pb-3">
                    <small>© {new Date().getFullYear()} OldPizzeria. Усі права захищено.</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
