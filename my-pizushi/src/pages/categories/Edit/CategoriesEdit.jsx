import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import axiosInstance from "../../../api/axiosInstance";
import {BASE_URL} from "../../../api/apiConfig";
import {useNavigate, useParams} from "react-router-dom";
import BaseTextInput from "../../../components/common/BaseTextInput/BaseTextInput";
import BaseFileInput from "../../../components/common/BaseFileInput/BaseFileInput";
import {motion} from "framer-motion";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Вкажіть назву"),
    slug: Yup.string().required("Вкажіть слаг"),
    imageFile: Yup.mixed().nullable()
});

const CategoriesEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);

    const initValues = {
        id: "",
        name: "",
        slug: "",
        imageFile: null,
    };

    const formik = useFormik({
        initialValues: initValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("id", values.id);
                console.log("id", values.id,
                    "name", values.name,
                    "slug", values.slug,
                    "imageFile", values.imageFile)
                formData.append("name", values.name);
                formData.append("slug", values.slug);
                if (values.imageFile) {
                    formData.append("imageFile", values.imageFile);
                }

                const result = await axiosInstance.put(`${BASE_URL}/api/categories/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                console.log("Update success", result);
                navigate("/categories");

            } catch (err) {
                console.error("Update error", err);

                const serverErrors = {};
                const {response} = err;
                const {data} = response;
                if (data) {
                    const {errors} = data;
                    Object.entries(errors).forEach(([key, messages]) => {
                        let messageLines = "";
                        messages.forEach(message => {
                            messageLines += message + " ";
                        });
                        const field = key.charAt(0).toLowerCase() + key.slice(1);
                        serverErrors[field] = messageLines;
                    });
                }

                console.log("response", response);
                setErrors(serverErrors);
            }
        }
    });

    const {
        values,
        handleSubmit,
        errors,
        touched,
        setErrors,
        handleChange,
        setFieldValue,
        setValues
    } = formik;

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const response = await axiosInstance.get(`${BASE_URL}/api/categories/${id}`);
                const data = response.data;

                await setValues({
                    id: data.id,
                    name: data.name,
                    slug: data.slug,
                    imageFile: null
                });

                if (data.image) {
                    const imageUrl = `${BASE_URL}/images/1200_${data.image}`;
                    setPreviewImage(imageUrl);

                    const imageResponse = await fetch(imageUrl);
                    const blob = await imageResponse.blob();

                    const filename = data.image;
                    const file = new File([blob], filename, {type: blob.type});

                    onHandleFileChange({
                        target: {
                            files: [file]
                        }
                    });
                }

            } catch (err) {
                if (err.response.status === 404) {
                    navigate("/404");
                }
                console.error("Loading category error", err);
            }
        };

        loadCategory();
    }, [id, setValues]);

    const onHandleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            setFieldValue("imageFile", file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFieldValue("imageFile", null);
            setPreviewImage(null);
        }
    };

    return (
        <>
            <div className="container py-4">
                <motion.div
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.4}}
                >
                    <h1 className="text-center">Редагувати категорію</h1>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                >

                    <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
                        <BaseTextInput
                            label="Назва"
                            field="name"
                            error={errors.name}
                            touched={touched.name}
                            value={values.name}
                            onChange={handleChange}
                        />

                        <BaseTextInput
                            label="Url-Slug"
                            field="slug"
                            error={errors.slug}
                            touched={touched.slug}
                            value={values.slug}
                            onChange={handleChange}
                        />

                        <BaseFileInput
                            label="Оберіть фото"
                            field="imageFile"
                            error={errors.imageFile}
                            touched={touched.imageFile}
                            onChange={onHandleFileChange}
                        />

                        {previewImage && (
                            <div className="mb-3 text-center">
                                <img
                                    src={previewImage}
                                    alt="Прев’ю"
                                    style={{maxWidth: "100%", maxHeight: "300px", borderRadius: "10px"}}
                                />
                            </div>
                        )}

                        <button type="submit" className="btn btn-success">Зберегти зміни</button>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default CategoriesEdit;
