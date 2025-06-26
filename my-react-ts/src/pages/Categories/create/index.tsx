import {
    Form,
    Image,
    Input,
    type FormProps,
    Button,
    Upload,
    type UploadProps,
    type UploadFile,
    type GetProp,
    message
} from "antd";
import type {ICategoryCreate} from "../../../services/types.ts";
import ImgCrop from 'antd-img-crop';
import {useState} from "react";
import {useCreateCategoryMutation} from "../../../services/apiCategory.ts";
import {useNavigate} from "react-router";
import LoadingScreen from "../../../components/ui/loading/LoadingScreen.tsx";

const CategoriesCreatePage: React.FC = () => {

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imageError, setImageError] = useState(false);
    const [createCategory, {isLoading}] = useCreateCategoryMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();


    const onFinish: FormProps<ICategoryCreate>['onFinish'] = async (values) => {
        if (fileList.length === 0 || !fileList[0]?.originFileObj) {
            setImageError(true);
            return;
        }

        setImageError(false);

        const newCategory: ICategoryCreate = values;
        newCategory.imageFile = fileList[0].originFileObj;

        try {
            const created = await createCategory(newCategory).unwrap();
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
                Додати категорію
            </h2>

            <Form
                onFinish={onFinish}
                layout="vertical"
                className="flex flex-col items-center gap-4"
            >
                <Form.Item<ICategoryCreate>
                    label="Назва"
                    name="name"
                    className="w-full"
                    rules={[{required: true, message: 'Вкажіть назву категорії'}]}
                >
                    <Input placeholder="Наприклад, Одяг"/>
                </Form.Item>

                <Form.Item<ICategoryCreate>
                    label="Слаг"
                    name="slug"
                    className="w-full"
                    rules={[{required: true, message: 'Вкажіть слаг категорії'}]}
                >
                    <Input placeholder="odyah"/>
                </Form.Item>

                <Form.Item
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
                        Додати категорію
                    </Button>
                </Form.Item>
            </Form>
            {isLoading && (
                <LoadingScreen/>
            )}
            {contextHolder}
        </div>
    );
}

export default CategoriesCreatePage;