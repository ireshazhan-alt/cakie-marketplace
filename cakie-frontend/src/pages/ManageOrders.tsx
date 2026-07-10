import { useEffect, useState } from "react";
import { ArrowLeft, Clock, CheckCircle2, XCircle, ShoppingBag } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

type Order = {
  _id: string;
  cakeName: string;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  paymentStatus: string;
  billingName: string;
  createdAt: string;
  customerId?: {
    name: string;
    email: string;
  };
};

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : data.orders || []);
        } else {
          setMessage(data.message || "Failed to load orders");
        }
      } catch (error) {
        setMessage("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, orderStatus: newStatus } : o
          )
        );
        setMessage("Order status updated");
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (error) {
      setMessage("Failed to update order");
    }
  };

  return (
    <AdminLayout>
      <section className="glass relative overflow-hidden rounded-[2rem] p-6 lg:p-10">
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#ffd6e4]/80 blur-3xl" />
        <div className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[#d4a45f]/25 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
            <ShoppingBag className="h-3.5 w-3.5" />
            Order Management
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold text-chocolate lg:text-5xl">
            Manage Orders
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            View and update order statuses from all customers.
          </p>
        </div>
      </section>

      {message && (
        <div className="mt-5 rounded-2xl border border-[#f1ded6] bg-white/80 px-5 py-3 text-sm text-chocolate">
          {message}
        </div>
      )}

      <section className="glass mt-6 rounded-3xl p-6">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-chocolate">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-chocolate">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-chocolate">Cake</th>
                  <th className="text-left py-3 px-4 font-semibold text-chocolate">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-chocolate">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-chocolate">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-border hover:bg-white/30">
                    <td className="py-3 px-4 text-xs font-mono text-muted-foreground">
                      {order._id.substring(0, 8)}...
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-chocolate font-medium">{order.billingName}</p>
                        <p className="text-xs text-muted-foreground">{order.customerId?.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{order.cakeName}</td>
                    <td className="py-3 px-4 font-medium text-chocolate">
                      LKR {order.totalPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="text-xs py-1 px-2 rounded bg-white/70 border border-border text-chocolate"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="text-xs rounded-full">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default ManageOrders;