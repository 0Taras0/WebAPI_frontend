import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useEditUserMutation, useGetRolesQuery, useGetUserQuery} from "../../../../services/apiUser";
import {Form, Input, Button, Checkbox, Avatar, Upload, message} from "antd";
import {UserOutlined, UploadOutlined} from "@ant-design/icons";
import LoadingScreen from "../../../../components/ui/loading/LoadingScreen.tsx";
import {APP_ENV} from "../../../../env";
import type {IAdminUserUpdateModel} from "../../../../services/types.ts";

const UserEditPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {data: getUser, isLoading: isUserLoading} = useGetUserQuery(id);
    const {data: getRoles, isLoading: isRolesLoading} = useGetRolesQuery();
    const [editUser, { isLoading: isEditLoading }] = useEditUserMutation();

    const [form] = Form.useForm<IAdminUserUpdateModel>();
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (getUser) {
            form.setFieldsValue({
                firstName: getUser.firstName,
                lastName: getUser.lastName,
                email: getUser.email,
                roles: getUser.roles,
                password: "",
                imageFile: null
            });

            setFirstName(getUser.firstName);
            setLastName(getUser.lastName);
            setEmail(getUser.email);
            setImage(getUser.image);
        }
    }, [getUser, form]);


    const handleFinish = async (values: IAdminUserUpdateModel) => {
        values.id = getUser!.id;

        if (imageFile) {
            values.imageFile = imageFile;
        }
        else {
            values.imageFile = null;
        }

        try {
            await editUser(values).unwrap();
            navigate(-1);
        } catch (error) {
            message.error("Помилка при оновленні користувача");
        }
    };

    if (isUserLoading || isRolesLoading || isEditLoading || !getUser || !getRoles) {
        return <LoadingScreen />;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Редагування користувача</h2>

            <div className="flex items-center gap-4 mb-6">
                <Avatar
                    size={64}
                    src={imageFile ? URL.createObjectURL(imageFile) : `${APP_ENV.IMAGES_200_URL}${image}`}
                    icon={<UserOutlined />}
                />
                <div>
                    <p className="text-lg font-medium">
                        {firstName} {lastName}
                    </p>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    roles: [],
                    password: '',
                }}
            >
                <Form.Item label="Ім’я" name="firstName" rules={[{ required: true }]}>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>

                <Form.Item label="Прізвище" name="lastName" rules={[{ required: true }]}>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                        showUploadList={{showRemoveIcon: true}}
                        onRemove={() => setImageFile(null)}
                    >
                        <Button icon={<UploadOutlined />}>Оберіть файл</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Ролі" name="roles">
                    <Checkbox.Group className="flex flex-col gap-2">
                        {(Array.isArray(getRoles?.roles) ? getRoles.roles : []).map(role => (
                            <Checkbox key={role} value={role}>
                                {role}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="mt-4">
                        Зберегти зміни
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserEditPage;