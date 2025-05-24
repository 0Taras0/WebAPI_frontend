import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="text-center mt-5"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className="display-4 mb-4 text-danger">Сторінку не знайдено</h1>
            <p className="lead mb-4">
                Упс! Схоже, що такої сторінки не існує. Можливо, вона була видалена або ви ввели неправильну адресу.
            </p>
            <div className="d-flex justify-content-center gap-3 mb-5">
                <button
                    className="btn btn-danger btn-lg"
                    onClick={() => navigate('/')}
                >
                    На головну
                </button>
                <button
                    className="btn btn-outline-danger btn-lg"
                    onClick={() => navigate(-1)}
                >
                    Назад
                </button>
            </div>
        </motion.div>
    );
};

export default NotFoundPage;
