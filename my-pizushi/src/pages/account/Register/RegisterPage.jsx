import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import axiosInstance from "../../../api/axiosInstance";
import { BASE_URL } from "../../../api/apiConfig";
import { jwtDecode } from "jwt-decode";
import { mapServerErrorsToFormik } from "../../../helpers/formikErrorHelper";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { EmailInput } from "../../../components/common/EmailInput/EmailInput";
import { PasswordInput } from "../../../components/common/PasswordInput/PasswordInput";
import LoadingOverlay from "../../../components/common/LoadingOverlay/LoadingOverlay";
import * as Yup from "yup";
import BaseFileInput from "../../../components/common/BaseFileInput/BaseFileInput";
import BaseTextInput from "../../../components/common/BaseTextInput/BaseTextInput";
import AnimatedElement from "../../../components/common/AnimatedElement/AnimatedElement";
import useImagePreview from "../../../hooks/useImagePreview";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Ім'я не може бути порожнім"),
    lastName: Yup.string().required("Прізвище не може бути порожнім"),
    email: Yup.string().email("Введіть правильний формат, наприклад ex@gmail.com").required("Пошта не може бути порожньою"),
    password: Yup.string().required("Пароль не може бути порожнім"),
    imageFile: Yup.mixed().nullable()
});

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuthStore((state) => state);
    const navigate = useNavigate();
    const { previewImage, handleImageChange } = useImagePreview();

    const initValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        imageFile: null
    };

    const handleFormikSubmit = async (values) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("FirstName", values.firstName);
            formData.append("LastName", values.lastName);
            formData.append("Email", values.email);
            formData.append("Password", values.password);
            if (values.imageFile) {
                formData.append("ImageFile", values.imageFile);
            }

            const result = await axiosInstance.post(`${BASE_URL}/api/Account/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            const token = result.data.token;
            localStorage.setItem("jwt", token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            navigate("/");
        } catch (err) {
            console.error("Send request error", err);
            mapServerErrorsToFormik(err, setErrors);
        } finally {
            setIsLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleFormikSubmit,
        validationSchema: validationSchema
    });

    const { values, handleSubmit, errors, touched, setErrors, handleChange, setFieldValue } = formik;

    return (
        <>
            {errors.general && (
                <div className="alert alert-danger" role="alert">
                    {errors.general}
                </div>
            )}

            <AnimatedElement direction="top" duration={0.5}>
                <h1 className="text-center">Реєстрація</h1>
            </AnimatedElement>

            <AnimatedElement direction="bottom" duration={0.8}>
                <form onSubmit={handleSubmit} noValidate className="col-md-6 offset-md-3">
                    <BaseTextInput
                        label="Ім'я"
                        field="firstName"
                        value={values.firstName}
                        error={errors.firstName}
                        touched={touched.firstName}
                        onChange={handleChange}
                    />

                    <BaseTextInput
                        label="Прізвище"
                        field="lastName"
                        value={values.lastName}
                        error={errors.lastName}
                        touched={touched.lastName}
                        onChange={handleChange}
                    />

                    <EmailInput
                        label="Email"
                        field="email"
                        error={errors.email}
                        touched={touched.email}
                        value={values.email}
                        onChange={handleChange}
                    />

                    <PasswordInput
                        label="Пароль"
                        field="password"
                        error={errors.password}
                        touched={touched.password}
                        value={values.password}
                        onChange={handleChange}
                    />

                    <BaseFileInput
                        label="Зображення"
                        field="imageFile"
                        error={errors.imageFile}
                        touched={touched.imageFile}
                        onChange={(e) => {
                            const file = e.currentTarget.files?.[0];
                            setFieldValue("imageFile", file);
                            handleImageChange(e);
                        }}
                    />

                    {previewImage && (
                        <div className="mb-3 text-center">
                            <img
                                src={previewImage}
                                alt="Прев’ю"
                                style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "10px" }}
                            />
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary">Зареєструватися</button>

                    {isLoading && <LoadingOverlay />}
                </form>
            </AnimatedElement>
        </>
    );
};

export default RegisterPage;
