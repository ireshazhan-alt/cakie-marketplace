import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Customer = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
};

type Order = {
  _id: string;
  customerId: Customer;
  cakeName: string;
  quantity: number;
  totalPrice: number;
  deliveryAddress: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
};

const ManageOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update order status");
        return;
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: data.order.orderStatus }
            : order
        )
      );

      setMessage("Order status updated successfully.");
    } catch (error) {
      setMessage("Something went wrong while updating status.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff7f1]">
        <p className="text-[#5c4033] font-medium">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff7f1] px-4 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#5c4033]">
            Manage Orders
          </h1>
          <p className="text-gray-500 mt-2">
            View, accept, reject, and update customer orders.
          </p>
        </div>

        {message && (
          <p className="bg-white/80 shadow rounded-2xl p-4 text-[#8a5438] mb-5">
            {message}
          </p>
        )}

        {orders.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-[#5c4033]">
              No orders found
            </h2>
            <p className="text-gray-500 mt-2">
              Customer orders will appear here after they place orders.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div>
                    <p className="text-sm text-gray-400">
                      Order ID: {order._id}
                    </p>

                    <h2 className="text-xl font-semibold text-[#5c4033] mt-1">
                      {order.cakeName}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Customer: {order.customerId?.name || "Unknown customer"}
                    </p>

                    <p className="text-gray-500">
                      Email: {order.customerId?.email || "Not available"}
                    </p>

                    <p className="text-gray-500">
                      Phone: {order.customerId?.phone || "Not provided"}
                    </p>

                    <p className="text-gray-500">
                      Quantity: {order.quantity}
                    </p>

                    <p className="text-gray-500">
                      Delivery: {order.deliveryAddress}
                    </p>

                    <p className="text-gray-500">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col lg:items-end gap-3">
                    <p className="text-lg font-bold text-[#5c4033]">
                      Rs. {order.totalPrice}
                    </p>

                    <span className="px-4 py-1 rounded-full text-sm bg-[#f4dfd0] text-[#8a5438] capitalize">
                      {order.orderStatus}
                    </span>

                    <p className="text-sm text-gray-500 capitalize">
                      Payment: {order.paymentStatus}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => updateStatus(order._id, "accepted")}
                        className="bg-green-600 hover:bg-green-700 rounded-full"
                      >
                        Accept
                      </Button>

                      <Button
                        onClick={() => updateStatus(order._id, "rejected")}
                        className="bg-red-500 hover:bg-red-600 rounded-full"
                      >
                        Reject
                      </Button>

                      <Button
                        onClick={() => updateStatus(order._id, "delivered")}
                        className="bg-[#c7825a] hover:bg-[#a96846] rounded-full"
                      >
                        Mark Delivered
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;