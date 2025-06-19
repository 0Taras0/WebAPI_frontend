import {useAuthStore} from "../../../store/useAuthStore";
import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../../../api/apiConfig";

const ProfilePage = () => {
    const { user } = useAuthStore((state) => state);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get("/api/Order/list")
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => console.error("Error loading orders", err));
    }, [user, navigate]);

    return (
        <div className="container mt-4">
            <h2>Мої замовлення</h2>

            {orders.length === 0 ? (
                <p>Немає замовлень.</p>
            ) : (
                <div className="list-group">
                    {orders.map(order => (
                        <div key={order.id} className="list-group-item mb-4 border rounded p-3 shadow-sm">
                            <h5>Замовлення #{order.id}</h5>
                            <p><strong>Статус:</strong> {order.status}</p>
                            <p><strong>Дата:</strong> {new Date(order.dateCreated).toLocaleString()}</p>
                            <p><strong>Сума:</strong> {order.totalPrice.toFixed(2)} ₴</p>

                            <h6 className="mt-3">Товари:</h6>
                            <ul className="list-group">
                                {order.orderItems.map((item, index) => (
                                    <li key={index} className="list-group-item d-flex align-items-center">
                                        <img
                                            src={`${BASE_URL}/images/800_${item.productImage}`}
                                            alt={item.productName}
                                            style={{ width: 60, height: 60, objectFit: "cover", marginRight: 15 }}
                                        />
                                        <div>
                                            <div><strong>{item.productName}</strong></div>
                                            <div>{item.quantity} × {item.priceBuy.toFixed(2)} ₴</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;