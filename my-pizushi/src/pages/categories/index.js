import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useSearchParams} from "react-router-dom";
import {motion} from 'framer-motion';
import axiosInstance from "../../api/axiosInstance";
import {BASE_URL} from "../../api/apiConfig";
import CategorySearchForm from "../../components/common/CategorySearchForm/CategorySearchForm";
import {Pagination} from "antd";

const CategoriesPage = () => {
    const [list, setList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    // Отримуємо дані з URL
    const searchModel = {
        name: searchParams.get("name") || '',
        categorySlug: searchParams.get("categorySlug") || '',
        currentPage: parseInt(searchParams.get("currentPage")) || 1,
        pageSize: parseInt(searchParams.get("pageSize")) || 10
    };

    // Отримання даних з API
    useEffect(() => {
        axiosInstance
            .get('/api/Categories/search', {params: searchModel})
            .then((res) => {
                setList(res.data.items);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [searchParams.toString()]);

    // Оновлення параметрів у URL
    const updateSearchParams = (updates) => {
        const newParams = {
            ...Object.fromEntries(searchParams.entries()),
            ...updates
        };
        setSearchParams(newParams);
    };

    const handleSearch = () => {
        updateSearchParams({currentPage: 1});
    };

    const handlePageChange = (page, pageSize) => {
        updateSearchParams({currentPage: page, pageSize});
    };

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
                <CategorySearchForm
                    searchName={searchModel.name}
                    searchSlug={searchModel.categorySlug}
                    pageSize={searchModel.pageSize}
                    onSearchNameChange={(val) => updateSearchParams({name: val, currentPage: 1})}
                    onSearchSlugChange={(val) => updateSearchParams({categorySlug: val, currentPage: 1})}
                    onPageSizeChange={(val) => updateSearchParams({pageSize: val, currentPage: 1})}
                    onSearch={handleSearch}
                />

                {list.length === 0 ? (
                    <h2 className="text-center text-muted">Список пустий</h2>
                ) : (
                    <>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                            {list.map((item) => (
                                <div key={item.id} className="col">
                                    <div className="card h-100 shadow-sm">
                                        <img
                                            src={`${BASE_URL}/images/200_${item.image}`}
                                            alt={item.name}
                                            className="card-img-top"
                                            style={{height: '200px', objectFit: 'cover'}}
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

                        <div className="d-flex justify-content-center mt-4">
                            <Pagination
                                current={searchModel.currentPage}
                                pageSize={searchModel.pageSize}
                                total={totalPages * searchModel.pageSize}
                                onChange={handlePageChange}
                            />
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default CategoriesPage;