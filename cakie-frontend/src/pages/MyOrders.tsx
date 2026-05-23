import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Order = {
  _id: string;
  cakeName: string;
  quantity: number;
  totalPrice: number;
  deliveryAddress: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
};

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to load orders");
          return;
        }

        setOrders(data.orders);
      } catch (error) {
        setMessage("Something went wrong while loading orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff7f1]">
        <p className="text-[#5c4033] font-medium">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff7f1] px-4 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#5c4033]">My Orders</h1>
          <p className="text-gray-500 mt-2">
            View and track your cake orders.
          </p>
        </div>

        {message && (
          <p className="bg-white/80 shadow rounded-2xl p-5 text-red-500 mb-5">
            {message}
          </p>
        )}

        {orders.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-[#5c4033]">
              No orders yet
            </h2>
            <p className="text-gray-500 mt-2">
              Your cake orders will appear here after you place an order.
            </p>

            <Button
              onClick={() => navigate("/")}
              className="mt-5 bg-[#c7825a] hover:bg-[#a96846] rounded-full"
            >
              Browse Cakes
            </Button>
          </div>
        ) : (
          <div className="grid gap-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <p className="text-sm text-gray-400">
                    Order ID: {order._id}
                  </p>

                  <h2 className="text-xl font-semibold text-[#5c4033] mt-1">
                    {order.cakeName}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Quantity: {order.quantity} | Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-gray-500">
                    Delivery: {order.deliveryAddress}
                  </p>

                  <p className="text-gray-500 capitalize">
                    Payment: {order.paymentStatus}
                  </p>
                </div>

                <div className="flex flex-col md:items-end gap-3">
                  <p className="text-lg font-bold text-[#5c4033]">
                    Rs. {order.totalPrice}
                  </p>

                  <span className="px-4 py-1 rounded-full text-sm bg-[#f4dfd0] text-[#8a5438] capitalize">
                    {order.orderStatus}
                  </span>

                  <Button className="bg-[#c7825a] hover:bg-[#a96846] rounded-full">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;