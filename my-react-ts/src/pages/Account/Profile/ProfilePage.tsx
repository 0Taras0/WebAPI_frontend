import React from "react";
import {useAppSelector} from "../../../store";
import {useGetUserOrdersQuery} from "../../../services/apiOrder.ts";
import LoadingScreen from "../../../components/ui/loading/LoadingScreen.tsx";
import {APP_ENV} from "../../../env";

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
            <h2 className="text-2xl font-bold mb-4">Профіль користувача</h2>
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={user.image ? `${APP_ENV.IMAGES_200_URL}${user.image}` : '/images/user/default.png'}
                    alt="User"
                    className="w-20 h-20 rounded-full object-cover border"
                />
                <div>
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-3">Мої замовлення</h3>

            {userOrders && userOrders.length === 0 && <p>Замовлень ще немає.</p>}

            {userOrders && userOrders.length > 0 && (
                <div className="space-y-6">
                    {[...userOrders]
                        .sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime())
                        .map((order, index) => (
                            <div
                                key={order.id}
                                className="border p-4 rounded-lg shadow-sm bg-white"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <p className="font-semibold">Замовлення №{index + 1}</p>
                                        <p className="text-sm text-gray-500">
                                            Створено: {new Date(order.dateCreated).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                            <span
                                className={`px-3 py-1 text-sm rounded-full ${
                                    order.status === "Нове"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "Скасовано (вручну)"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {order.status}
                            </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {order.orderItems?.map(item => (
                                        <div
                                            key={item.productId}
                                            className="flex gap-4 items-center border-t pt-2"
                                        >
                                            <img
                                                src={`${APP_ENV.IMAGES_200_URL}${item.productImage}`}
                                                alt={item.productName}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-grow">
                                                <p className="font-medium">{item.productName}</p>
                                                <p className="text-sm text-gray-600">
                                                    Кількість: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold">
                                                {item.priceBuy.toFixed(2)} ₴
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-right mt-3 font-bold">
                                    Загальна сума: {order.totalPrice.toFixed(2)} ₴
                                </div>
                            </div>
                        ))
                        .reverse()}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
