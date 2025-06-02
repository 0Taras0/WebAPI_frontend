import React, {useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import axiosInstance from "../../../api/axiosInstance";
import {BASE_URL} from "../../../api/apiConfig";
import {useNavigate} from "react-router-dom";
import BaseTextInput from "../../../components/common/BaseTextInput/BaseTextInput";
import BaseFileInput from "../../../components/common/BaseFileInput/BaseFileInput";
import {motion} from "framer-motion";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Вкажіть назву"),
    slug: Yup.string().required("Вкажіть слаг"),
    imageFile: Yup.mixed().nullable()
});

const CategoriesAdd = () => {
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState(null);

    const initValues = {
        name: "",
        slug: "",
        imageFile: null,
    };

    const handleFormikSubmit = async (values) => {
        console.log("Submit formik", values);
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("slug", values.slug);
            if (values.imageFile) {
                formData.append("imageFile", values.imageFile);
            }

            const result = await axiosInstance.post(`${BASE_URL}/api/categories`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log("Server result", result);
            navigate("/categories");

        } catch (err) {
            console.error("Send request error", err);

            const serverErrors = {};
            const {response} = err;
            const {data} = response;
            if (data) {
                const {errors} = data;
                Object.entries(errors).forEach(([key, messages]) => {
                    let messageLines = "";
                    messages.forEach(message => {
                        messageLines += message + " ";
                        console.log(`${key}: ${message}`);
                    });
                    const field = key.charAt(0).toLowerCase() + key.slice(1);
                    serverErrors[field] = messageLines;
                });
            }
            console.log("response", response);
            console.log("serverErrors", serverErrors);
            setErrors(serverErrors);
        }
    };

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleFormikSubmit,
        validationSchema: validationSchema,
    });

    const {
        values,
        handleSubmit,
        errors,
        touched,
        setErrors,
        handleChange,
        setFieldValue
    } = formik;

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
                    <h1 className="text-center">Додати категорію</h1>
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

                        <button type="submit" className="btn btn-primary">Додати</button>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default CategoriesAdd;
