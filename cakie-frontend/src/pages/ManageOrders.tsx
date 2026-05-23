import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
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

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(error);
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
            ? {
                ...order,
                orderStatus: data.order?.orderStatus || status,
              }
            : order
        )
      );

      setMessage("Order status updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while updating status.");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Admin
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-chocolate mt-3">
          Manage Orders
        </h1>
        <p className="text-muted-foreground mt-3">
          View, accept, reject, and update customer cake orders.
        </p>
      </div>

      {loading && (
        <div className="rounded-3xl border border-[#f1ded6] bg-white/80 p-8 text-center shadow-sm">
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      )}

      {message && (
        <p className="mb-5 rounded-2xl border border-[#f1ded6] bg-white/80 px-4 py-3 text-sm text-chocolate shadow-sm">
          {message}
        </p>
      )}

      {!loading && orders.length === 0 ? (
        <div className="rounded-3xl border border-[#f1ded6] bg-white/80 p-8 text-center shadow-sm backdrop-blur-md">
          <h2 className="text-xl font-semibold text-chocolate">
            No orders found
          </h2>
          <p className="text-muted-foreground mt-2">
            Customer orders will appear here after they place orders.
          </p>
        </div>
      ) : null}

      {!loading && orders.length > 0 && (
        <div className="grid gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-3xl border border-[#f1ded6] bg-white/90 p-6 shadow-sm backdrop-blur-md"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Order ID: {order._id}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-chocolate">
                    {order.cakeName}
                  </h2>

                  <div className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                    <p>
                      <span className="font-medium text-[#3f2a22]">
                        Customer:
                      </span>{" "}
                      {order.customerId?.name || "Unknown customer"}
                    </p>

                    <p>
                      <span className="font-medium text-[#3f2a22]">
                        Email:
                      </span>{" "}
                      {order.customerId?.email || "Not available"}
                    </p>

                    <p>
                      <span className="font-medium text-[#3f2a22]">
                        Phone:
                      </span>{" "}
                      {order.customerId?.phone || "Not provided"}
                    </p>

                    <p>
                      <span className="font-medium text-[#3f2a22]">
                        Quantity:
                      </span>{" "}
                      {order.quantity}
                    </p>

                    <p className="md:col-span-2">
                      <span className="font-medium text-[#3f2a22]">
                        Delivery:
                      </span>{" "}
                      {order.deliveryAddress}
                    </p>

                    <p>
                      <span className="font-medium text-[#3f2a22]">
                        Date:
                      </span>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 xl:items-end">
                  <p className="text-2xl font-bold text-chocolate">
                    Rs. {order.totalPrice}
                  </p>

                  <span className="rounded-full bg-[#fff0f4] px-4 py-1 text-sm font-medium capitalize text-chocolate">
                    {order.orderStatus}
                  </span>

                  <p className="text-sm capitalize text-muted-foreground">
                    Payment: {order.paymentStatus}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => updateStatus(order._id, "Accepted")}
                      className="rounded-full bg-green-600 hover:bg-green-700"
                    >
                      Accept
                    </Button>

                    <Button
                      onClick={() => updateStatus(order._id, "Rejected")}
                      className="rounded-full bg-red-500 hover:bg-red-600"
                    >
                      Reject
                    </Button>

                    <Button
                      onClick={() => updateStatus(order._id, "Delivered")}
                      className="rounded-full bg-[#c7825a] hover:bg-[#a96846]"
                    >
                      Mark Delivered
                    </Button>

                    <Button
                      onClick={() => navigate(`/orders/${order._id}`)}
                      variant="outline"
                      className="rounded-full"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageOrders;