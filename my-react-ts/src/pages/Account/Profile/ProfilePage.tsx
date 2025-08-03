import React from "react";
import {useAppSelector} from "../../../store";
import {useGetUserOrdersQuery} from "../../../services/apiOrder.ts";
import LoadingScreen from "../../../components/ui/loading/LoadingScreen.tsx";
import {APP_ENV} from "../../../env";
import UserOrdersTable from "../../../components/ui/table/UserOrdersTable/UserOrdersTable.tsx";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router";

const ProfilePage: React.FC = () => {
    const {user} = useAppSelector(state => state.auth);
    const {data: userOrders, isLoading, isError} = useGetUserOrdersQuery();

    if (isLoading) {
        return (
            <LoadingScreen/>
        )
    }

    if (isError) {
        return <p className="text-red-500">Помилка при завантаженні замовлень.</p>;
    }

    return (
        <div className="p-4">
            <div className="max-w-2xl mx-auto bg-orange-50 p-6 rounded-xl shadow-md shadow-orange-200 border border-orange-100 mb-4">
                <h2 className="text-2xl font-bold text-orange-600 mb-4">Профіль користувача</h2>
                <div className="columns-1">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Avatar
                            size={256}
                            src={`${APP_ENV.IMAGES_1200_URL}${user!.image}`}
                            icon={<UserOutlined />}
                        />
                        <div>
                            <p className="text-xl font-semibold text-gray-800">{user!.name}</p>
                            <p className="text-xl text-gray-600">{user!.email}</p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Link to={'edit'}>
                            <button
                                type="submit"
                                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Редагувати профіль
                            </button>
                        </Link>
                    </div>
                </div>
            </div>


            <h3 className="text-xl font-bold mb-3 flex justify-center">Мої замовлення</h3>

            <UserOrdersTable orders={userOrders!} />
        </div>
    );
};

export default ProfilePage;
