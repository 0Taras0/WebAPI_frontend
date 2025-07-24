import {
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery
} from "../../services/apiCategory.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import {APP_ENV} from "../../env";
import {Link} from "react-router";
import {message, Modal} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useState} from "react";
import type {ICategoryItem} from "../../services/types.ts";
import LoadingScreen from "../../components/ui/loading/LoadingScreen.tsx";

const CategoriesListPage: React.FC = () => {

    const {data: categories, isLoading: isCategoriesLoading, isError, refetch} = useGetAllCategoriesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [deleteCategory] = useDeleteCategoryMutation();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [deleteCategoryModel, setDeleteCategoryModel] = useState<ICategoryItem>();
    const [messageApi, contextHolder] = message.useMessage();

    if (isCategoriesLoading) {
        return (
            <LoadingScreen/>
        )
    }
    if (isError || !categories) return <p>Something went wrong.</p>;


    const showModal = (category: ICategoryItem) => {
        setOpen(true);
        setDeleteCategoryModel(category);
        setModalText(`Ви дійсно хочете видалити ${category.name}?`);
    };

    const handleOk = async () => {
        if (!deleteCategoryModel) return;

        setModalText('Зачекайте, категорія видаляється...');
        setConfirmLoading(true);

        try {
            await deleteCategory(deleteCategoryModel.id.toString()).unwrap();
            await refetch();
            messageApi.open({
                type: 'success',
                content: 'Категорію успішно видалено!',
            })
            setOpen(false);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: `Помилка при видаленні категорії: ${error}`,
            });
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };


    return (
        <div
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Categories
                </h3>
                <div className="flex items-center gap-3">
                    <button className="btn">Filter</button>
                    <button className="btn">See all</button>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell isHeader className="py-3 text-start">Category</TableCell>
                            <TableCell isHeader className="py-3 text-start">Slug</TableCell>
                            <TableCell isHeader className="py-3 text-start">Image</TableCell>
                            <TableCell isHeader className="py-3 text-start">Actions</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="py-3 font-medium text-gray-800 dark:text-white/90">
                                    {category.name}
                                </TableCell>

                                <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                                    {category.slug}
                                </TableCell>

                                <TableCell className="py-3">
                                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                                        <img
                                            src={`${APP_ENV.IMAGES_100_URL}${category.image}`}
                                            alt={category.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </TableCell>

                                <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                                    <div className="flex space-x-4">
                                        <Link
                                            to={`edit/${category.id}`}
                                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                        >
                                            <EditOutlined className="mr-1"/>
                                            <span className="font-medium underline">Edit</span>
                                        </Link>

                                        <div onClick={() => showModal(category)}
                                             className="flex items-center cursor-pointer text-red-600 hover:text-red-800 transition-colors duration-200">
                                            <DeleteOutlined className="mr-1"/>
                                            <span className="font-medium underline">Remove</span>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Modal
                title="Видалення"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
            {contextHolder}
        </div>
    );
}

export default CategoriesListPage;