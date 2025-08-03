import {useNavigate} from "react-router";
import {Avatar, Button, Form, Input, Upload, message} from "antd";
import React, {useState} from "react";
import {APP_ENV} from "../../../env";
import {UploadOutlined, UserOutlined} from "@ant-design/icons";
import {useAppSelector} from "../../../store";
import {useEditMutation} from "../../../services/apiAccoount.ts";
import type {IAccountUpdateModel} from "../../../services/types.ts";
import {useWatch} from "antd/es/form/Form";

const EditAccountPage: React.FC = () => {
    const {user} = useAppSelector(state => state.auth);
    const [form] = Form.useForm<IAccountUpdateModel>();
    const navigate = useNavigate();
    const [editAccount, { isLoading }] = useEditMutation();

    const [imageFile, setImageFile] = useState<File | null>(null);

    const nameParts = user!.name.trim().split(" ");
    const defaultLastName = nameParts[0];
    const defaultFirstName = nameParts.slice(1).join(" ");

    const watchedFirstName = useWatch('firstName', form) ?? defaultFirstName;
    const watchedLastName = useWatch('lastName', form) ?? defaultLastName;
    const watchedEmail = useWatch('email', form) ?? user!.email;

    const handleFinish = async (values: IAccountUpdateModel) => {
        const model: IAccountUpdateModel = {
            ...values,
            imageFile: imageFile,
            password: values.password || ""
        };

        try {
            await editAccount(model).unwrap();
            message.success("Профіль оновлено");
            navigate(-1);
        } catch {
            message.error("Помилка при оновленні профілю");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-md shadow-orange-200 border border-orange-100">
            <h2 className="text-2xl font-semibold mb-6">Редагування профілю</h2>

            <div className="flex items-center gap-4 mb-6">
                <Avatar
                    size={64}
                    src={imageFile ? URL.createObjectURL(imageFile) : `${APP_ENV.IMAGES_1200_URL}${user!.image}`}
                    icon={<UserOutlined />}
                />
                <div>
                    <p className="text-lg font-medium">{watchedFirstName} {watchedLastName}</p>
                    <p className="text-sm text-gray-500">{watchedEmail}</p>
                </div>
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    firstName: defaultFirstName,
                    lastName: defaultLastName,
                    email: user!.email,
                    password: ""
                }}
                onFinish={handleFinish}
            >
            <Form.Item label="Ім’я" name="firstName" rules={[{ required: true, message: "Вкажіть ім’я" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Прізвище" name="lastName" rules={[{ required: true, message: "Вкажіть прізвище" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: "Некоректна електронна пошта" }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    tooltip="Залиште пустим, якщо не хочете змінювати"
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label="Зображення" tooltip="Залиште пустим, якщо не хочете змінювати">
                    <Upload
                        beforeUpload={(file) => {
                            setImageFile(file);
                            return false;
                        }}
                        maxCount={1}
                        showUploadList={{ showRemoveIcon: true }}
                        onRemove={() => setImageFile(null)}
                    >
                        <Button icon={<UploadOutlined />}>Оберіть файл</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Збереження..." : "Зберегти зміни"}
                    </button>

                </Form.Item>
            </Form>
        </div>
    );
};

export default EditAccountPage;