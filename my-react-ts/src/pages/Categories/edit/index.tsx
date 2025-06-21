import {
    useEditCategoryMutation,
    useGetCategoryQuery
} from "../../../services/apiCategory.ts";

import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {
    Button, Flex,
    Form,
    type FormProps,
    type GetProp, Image,
    Input,
    message,
    Spin,
    Upload,
    type UploadFile,
    type UploadProps
} from "antd";
import type {ICategoryEdit} from "../../../services/types.ts";
import ImgCrop from "antd-img-crop";
import {LoadingOutlined} from "@ant-design/icons";
import {APP_ENV} from "../../../env";
import type {RcFile} from "antd/es/upload";

const CategoriesEditPage: React.FC = () => {

    const {id} = useParams();
    const {data: getCategory} = useGetCategoryQuery(`${id}`);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchImageAsRcFile = async (url: string, filename: string) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], filename, { type: blob.type });

            const rcFile = file as RcFile;
            rcFile.uid = `${Date.now()}`;
            return rcFile;
        };

        if (getCategory) {
            form.setFieldsValue({
                id: `${id}`,
                name: getCategory.name,
                slug: getCategory.slug,
            });

            if (getCategory.image) {
                const imageUrl = `${APP_ENV.IMAGES_1200_URL}${getCategory.image}`;

                fetchImageAsRcFile(imageUrl, getCategory.image).then((rcFile) => {
                    setFileList([
                        {
                            uid: rcFile.uid,
                            name: rcFile.name,
                            status: 'done',
                            url: imageUrl,
                            originFileObj: rcFile,
                        },
                    ]);
                });
            }
        }
    }, [getCategory]);




    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imageError, setImageError] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [editCategory, {isLoading}] = useEditCategoryMutation();


    const onFinish: FormProps<ICategoryEdit>['onFinish'] = async (values) => {
        if (fileList.length === 0 || !fileList[0]?.originFileObj) {

            setImageError(true);
            return;
        }

        setImageError(false);

        const newCategory: ICategoryEdit = values;
        newCategory.imageFile = fileList[0].originFileObj;

        try {
            const created = await editCategory(newCategory).unwrap();
            navigate('/admin/categories');
        } catch (err: any) {
            const errorMessage = err?.data?.errors?.Name?.[0]
            messageApi.open({
                type: 'error',
                content: `${errorMessage}`,
            });
        }
    };

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    return (
        <div
            className="mx-auto rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
                Редагувати категорію
            </h2>

            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="flex flex-col items-center gap-4"
            >
                <Form.Item name="id" hidden>
                    <Input type="hidden" />
                </Form.Item>

                <Form.Item<ICategoryEdit>
                    label="Назва"
                    name="name"
                    className="w-full"
                    rules={[{required: true, message: 'Вкажіть назву категорії'}]}
                >
                    <Input placeholder="Наприклад, Одяг"/>
                </Form.Item>

                <Form.Item<ICategoryEdit>
                    label="Слаг"
                    name="slug"
                    className="w-full"
                    rules={[{required: true, message: 'Вкажіть слаг категорії'}]}
                >
                    <Input placeholder="odyah"/>
                </Form.Item>

                <Form.Item<ICategoryEdit>
                    label="Зображення"
                    required
                    validateStatus={imageError ? 'error' : ''}
                    help={imageError ? 'Оберіть зображення категорії' : ''}
                    className="w-full text-center"
                >
                    <ImgCrop rotationSlider>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={({fileList}) => {
                                setFileList(fileList);
                                setImageError(false);
                            }}
                            onPreview={handlePreview}
                            customRequest={({onSuccess}) => {
                                setTimeout(() => onSuccess?.("ok"), 0);
                            }}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </ImgCrop>

                    {previewImage && (
                        <Image
                            wrapperStyle={{display: 'none'}}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </Form.Item>

                <Form.Item className="w-full text-center">
                    <Button type="primary" htmlType="submit" className="w-full sm:w-auto">
                        Редагувати категорію
                    </Button>
                </Form.Item>
            </Form>
            {isLoading && (
                <Flex align="center" gap="middle">
                    <Spin fullscreen indicator={<LoadingOutlined style={{fontSize: 48}} spin/>}/>
                </Flex>
            )}
            {contextHolder}
        </div>
    );
}

export default CategoriesEditPage;