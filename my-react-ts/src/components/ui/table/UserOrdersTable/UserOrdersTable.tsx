import type {IOrder} from "../../../../services/apiOrder.ts";
import {APP_ENV} from "../../../../env";

interface UserOrdersTableProps {
    orders: IOrder[];
}

const UserOrdersTable: React.FC<UserOrdersTableProps> = ({ orders }) => {
    return (
        <>
            {orders && orders.length === 0 && <p>Замовлень ще немає.</p>}

            {orders && orders.length > 0 && (
                <div className="space-y-6">
                    {[...orders]
                        .sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime())
                        .map((order, index) => (
                            <div
                                key={order.id}
                                className="border p-4 rounded-lg shadow-md shadow-orange-200 border-orange-100"
                            >
                                <div className="flex justify-between items-center mb-2 border p-4 rounded-lg shadow-sm bg-orange-500">
                                    <div>
                                        <p className="font-semibold text-white">Замовлення №{index + 1}</p>
                                        <p className="text-sm text-white">
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
        </>
    )
}

export default UserOrdersTable;