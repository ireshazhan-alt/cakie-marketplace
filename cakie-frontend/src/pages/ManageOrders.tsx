import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  Search,
  ShoppingBag,
  Truck,
  X,
  XCircle,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

type Customer = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
};

type Order = {
  _id: string;
  customerId?: Customer;
  cakeName: string;
  quantity: number;
  totalPrice: number;
  deliveryAddress: string;
  billingName?: string;
  phoneNumber?: string;
  paymentMethod?: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
};

const formatDate = (date?: string) => {
  if (!date) return "—";

  try {
    return new Date(date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "—";
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Accepted":
      return "bg-green-100 text-green-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    case "Delivered":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-white/70 text-chocolate";
  }
};

const ManageOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
      } else if (Array.isArray(data.data)) {
        setOrders(data.data);
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

      if (selectedOrder?._id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          orderStatus: data.order?.orderStatus || status,
        });
      }

      setMessage("Order status updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while updating status.");
    }
  };

  const filteredOrders = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return orders.filter((order) => {
      const customerName =
        order.billingName || order.customerId?.name || "unknown customer";

      return (
        order.cakeName?.toLowerCase().includes(term) ||
        customerName.toLowerCase().includes(term) ||
        order.orderStatus?.toLowerCase().includes(term) ||
        order.paymentStatus?.toLowerCase().includes(term) ||
        order.deliveryAddress?.toLowerCase().includes(term)
      );
    });
  }, [orders, searchTerm]);

  const stats = useMemo(() => {
    const pending = orders.filter(
      (order) => order.orderStatus === "Pending"
    ).length;

    const accepted = orders.filter(
      (order) => order.orderStatus === "Accepted"
    ).length;

    const rejected = orders.filter(
      (order) => order.orderStatus === "Rejected"
    ).length;

    const delivered = orders.filter(
      (order) => order.orderStatus === "Delivered"
    ).length;

    return {
      total: orders.length,
      pending,
      accepted,
      rejected,
      delivered,
    };
  }, [orders]);

  return (
    <AdminLayout>
      <section className="glass relative overflow-hidden rounded-[2rem] p-6 lg:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#ffd6e4]/80 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-[#d4a45f]/25 blur-3xl"
        />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
              <ShoppingBag className="h-3.5 w-3.5" />
              Order Control
            </div>

            <h1 className="mt-4 font-display text-4xl font-semibold text-chocolate lg:text-5xl">
              Manage Orders
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-muted-foreground lg:text-base">
              Review customer cake orders, accept or reject requests, and mark
              completed deliveries.
            </p>
          </div>

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
            <PackageCheck className="h-5 w-5 text-chocolate" />
            <div>
              <p className="text-sm font-medium text-chocolate">
                Live Order Board
              </p>
              <p className="text-xs text-muted-foreground">
                Synced with MongoDB
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#ffd6e4]/80 to-[#fff7f1] blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Total
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-chocolate">
                {loading ? "—" : stats.total}
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#ffc9b6]/80 to-[#fff7f1] blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Pending
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-chocolate">
                {loading ? "—" : stats.pending}
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#bfe8c8]/80 to-[#fff7f1] blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Accepted
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-chocolate">
                {loading ? "—" : stats.accepted}
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#ffb4b4]/70 to-[#fff7f1] blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Rejected
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-chocolate">
                {loading ? "—" : stats.rejected}
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#f6d28b]/70 to-[#fff7f1] blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Delivered
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-chocolate">
                {loading ? "—" : stats.delivered}
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
              <Truck className="h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      <section className="glass mt-6 rounded-3xl p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl text-chocolate">
              Customer Orders
            </h2>
            <p className="text-sm text-muted-foreground">
              Search and manage all cake orders.
            </p>
          </div>

          <div className="flex w-full items-center gap-3 rounded-full bg-white/70 px-4 py-3 shadow-soft lg:w-96">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cake, customer, status..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {message && (
          <div className="mt-5 rounded-2xl border border-[#f1ded6] bg-white/70 px-4 py-3 text-sm text-chocolate">
            {message}
          </div>
        )}

        {loading ? (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-white/40 p-8 text-center text-sm text-muted-foreground">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-white/40 p-8 text-center text-sm text-muted-foreground">
            No orders found.
          </div>
        ) : (
          <div className="mt-5 grid gap-4">
            {filteredOrders.map((order) => {
              const customerName =
                order.billingName ||
                order.customerId?.name ||
                "Unknown customer";

              const customerEmail = order.customerId?.email || "Not available";

              const customerPhone =
                order.phoneNumber ||
                order.customerId?.phone ||
                "Not provided";

              return (
                <div
                  key={order._id}
                  className="rounded-3xl bg-white/60 p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/50 text-chocolate">
                          <ShoppingBag className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="font-display text-2xl text-chocolate">
                            {order.cakeName}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Order #{String(order._id).slice(-6)} •{" "}
                            {formatDate(order.createdAt)}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-3 text-sm text-foreground/80 md:grid-cols-2 xl:grid-cols-3">
                        <p>
                          <span className="font-medium text-chocolate">
                            Quantity:
                          </span>{" "}
                          {order.quantity}
                        </p>

                        <p>
                          <span className="font-medium text-chocolate">
                            Total:
                          </span>{" "}
                          Rs. {Number(order.totalPrice || 0).toFixed(2)}
                        </p>

                        <p>
                          <span className="font-medium text-chocolate">
                            Payment:
                          </span>{" "}
                          {order.paymentMethod || order.paymentStatus || "N/A"}
                        </p>

                        <p className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          {customerEmail}
                        </p>

                        <p className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          {customerPhone}
                        </p>

                        <p>
                          <span className="font-medium text-chocolate">
                            Customer:
                          </span>{" "}
                          {customerName}
                        </p>

                        <p className="flex items-start gap-2 md:col-span-2 xl:col-span-3">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                          <span>{order.deliveryAddress}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 xl:w-72 xl:justify-end">
                      <Button
                        onClick={() => updateStatus(order._id, "Accepted")}
                        disabled={
                          order.orderStatus === "Accepted" ||
                          order.orderStatus === "Delivered"
                        }
                        className="rounded-full bg-green-600 hover:bg-green-700"
                      >
                        Accept
                      </Button>

                      <Button
                        onClick={() => updateStatus(order._id, "Rejected")}
                        disabled={
                          order.orderStatus === "Rejected" ||
                          order.orderStatus === "Delivered"
                        }
                        className="rounded-full bg-red-500 hover:bg-red-600"
                      >
                        Reject
                      </Button>

                      <Button
                        onClick={() => updateStatus(order._id, "Delivered")}
                        disabled={order.orderStatus === "Delivered"}
                        className="rounded-full bg-[#c7825a] hover:bg-[#a96846]"
                      >
                        Mark Delivered
                      </Button>

                      <Button
                        onClick={() => setSelectedOrder(order)}
                        variant="outline"
                        className="rounded-full bg-white/70"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredOrders.length > 0 && (
          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
            <p>
              Showing {filteredOrders.length} of {orders.length} orders
            </p>

            <a
              href="/admin-dashboard"
              className="inline-flex items-center gap-1 text-chocolate hover:underline"
            >
              Back to dashboard <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </section>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-chocolate/30 px-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-[#fffaf7] p-6 shadow-elevated">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-chocolate shadow-soft hover:bg-[#fff0f4]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 pr-10">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Order Details
              </p>

              <h2 className="mt-2 font-display text-3xl text-chocolate md:text-4xl">
                {selectedOrder.cakeName}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Order #{String(selectedOrder._id).slice(-6)} •{" "}
                {formatDate(selectedOrder.createdAt)}
              </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                  selectedOrder.orderStatus
                )}`}
              >
                {selectedOrder.orderStatus}
              </span>

              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-chocolate shadow-soft">
                Payment: {selectedOrder.paymentStatus || "N/A"}
              </span>

              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-chocolate shadow-soft">
                Method: {selectedOrder.paymentMethod || "N/A"}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white/70 p-5 shadow-soft">
                <h3 className="mb-4 font-display text-xl text-chocolate">
                  Cake Information
                </h3>

                <p className="text-sm">
                  <span className="font-medium text-chocolate">Cake:</span>{" "}
                  {selectedOrder.cakeName}
                </p>

                <p className="mt-2 text-sm">
                  <span className="font-medium text-chocolate">Quantity:</span>{" "}
                  {selectedOrder.quantity}
                </p>

                <p className="mt-2 text-sm">
                  <span className="font-medium text-chocolate">Total:</span>{" "}
                  Rs. {Number(selectedOrder.totalPrice || 0).toFixed(2)}
                </p>
              </div>

              <div className="rounded-3xl bg-white/70 p-5 shadow-soft">
                <h3 className="mb-4 font-display text-xl text-chocolate">
                  Customer Information
                </h3>

                <p className="text-sm">
                  <span className="font-medium text-chocolate">Name:</span>{" "}
                  {selectedOrder.billingName ||
                    selectedOrder.customerId?.name ||
                    "N/A"}
                </p>

                <p className="mt-2 text-sm">
                  <span className="font-medium text-chocolate">Email:</span>{" "}
                  {selectedOrder.customerId?.email || "N/A"}
                </p>

                <p className="mt-2 text-sm">
                  <span className="font-medium text-chocolate">Phone:</span>{" "}
                  {selectedOrder.phoneNumber ||
                    selectedOrder.customerId?.phone ||
                    "N/A"}
                </p>
              </div>

              <div className="rounded-3xl bg-white/70 p-5 shadow-soft md:col-span-2">
                <h3 className="mb-4 font-display text-xl text-chocolate">
                  Delivery Information
                </h3>

                <p className="text-sm">
                  <span className="font-medium text-chocolate">Address:</span>{" "}
                  {selectedOrder.deliveryAddress}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <Button
                onClick={() => updateStatus(selectedOrder._id, "Accepted")}
                disabled={
                  selectedOrder.orderStatus === "Accepted" ||
                  selectedOrder.orderStatus === "Delivered"
                }
                className="rounded-full bg-green-600 hover:bg-green-700"
              >
                Accept
              </Button>

              <Button
                onClick={() => updateStatus(selectedOrder._id, "Rejected")}
                disabled={
                  selectedOrder.orderStatus === "Rejected" ||
                  selectedOrder.orderStatus === "Delivered"
                }
                className="rounded-full bg-red-500 hover:bg-red-600"
              >
                Reject
              </Button>

              <Button
                onClick={() => updateStatus(selectedOrder._id, "Delivered")}
                disabled={selectedOrder.orderStatus === "Delivered"}
                className="rounded-full bg-[#c7825a] hover:bg-[#a96846]"
              >
                Mark Delivered
              </Button>

              <Button
                onClick={() => setSelectedOrder(null)}
                variant="outline"
                className="rounded-full bg-white/70"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageOrders;