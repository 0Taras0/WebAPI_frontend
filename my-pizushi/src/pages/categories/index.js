import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {motion} from 'framer-motion';
import axiosInstance from "../../api/axiosInstance";
import {BASE_URL} from "../../api/apiConfig";

const CategoriesPage = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        axiosInstance.get("/api/Categories")
            .then((res) => {
                setList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (

        <div className="container py-4">
            <motion.div
                initial={{opacity: 0, y: -30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
            >
                <h1 className="text-center mb-4">Категорії</h1>
            </motion.div>
            <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
                {list.length === 0 ? (
                    <h2 className="text-center text-muted">Список пустий</h2>
                ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {list.map((item) => (
                            <div key={item.id} className="col">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={`${BASE_URL}/images/200_${item.image}`}
                                        alt={item.name}
                                        className="card-img-top"
                                        style={{height: "200px", objectFit: "cover"}}
                                    />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title text-center mb-3">{item.name}</h5>
                                        <div className="text-center mt-auto">
                                            <Link to={`/categories/edit/${item.id}`} className="btn btn-primary">
                                                Редагувати
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default CategoriesPage;
