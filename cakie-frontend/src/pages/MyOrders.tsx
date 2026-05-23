import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Cake,
  Clock,
  CreditCard,
  MapPin,
  PackageCheck,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";
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

const normalizeStatus = (status?: string) => status?.trim().toLowerCase();

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
  switch (normalizeStatus(status)) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "accepted":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    case "delivered":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-white/70 text-chocolate";
  }
};

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

    fetchMyOrders();
  }, [navigate]);

  const filteredOrders = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return orders.filter((order) => {
      return (
        order.cakeName?.toLowerCase().includes(term) ||
        order.orderStatus?.toLowerCase().includes(term) ||
        order.paymentStatus?.toLowerCase().includes(term) ||
        order.deliveryAddress?.toLowerCase().includes(term)
      );
    });
  }, [orders, searchTerm]);

  const stats = useMemo(() => {
    const pending = orders.filter(
      (order) => normalizeStatus(order.orderStatus) === "pending"
    ).length;

    const delivered = orders.filter(
      (order) => normalizeStatus(order.orderStatus) === "delivered"
    ).length;

    return {
      total: orders.length,
      pending,
      delivered,
    };
  }, [orders]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff7f1] px-4">
        <div
          aria-hidden
          className="pointer-events-none fixed -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#ffd6e4]/70 blur-3xl"
        />
        <div className="glass rounded-3xl px-8 py-6 text-center">
          <ShoppingBag className="mx-auto mb-3 text-chocolate" size={36} />
          <p className="font-medium text-[#5c4033]">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f1] px-4 py-10 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none fixed -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#ffd6e4]/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#d4a45f]/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="rounded-full bg-white/70"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="rounded-full bg-chocolate text-primary-foreground hover:bg-chocolate/90"
          >
            <Cake className="mr-2 h-4 w-4" />
            Browse Cakes
          </Button>
        </div>

        <section className="glass relative overflow-hidden rounded-[2rem] p-6 shadow-soft md:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#ffd6e4]/80 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-[#d4a45f]/25 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
                <PackageCheck className="h-3.5 w-3.5" />
                Order Tracking
              </div>

              <h1 className="mt-4 font-display text-4xl font-semibold text-chocolate lg:text-5xl">
                My Orders
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-muted-foreground lg:text-base">
                View and track your cake orders from Cakie.
              </p>
            </div>

            <div className="hidden lg:grid h-28 w-28 place-items-center rounded-[2rem] bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/60 text-chocolate shadow-elevated">
              <ShoppingBag size={48} strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="glass relative overflow-hidden rounded-3xl p-5">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#ffd6e4]/80 to-[#fff7f1] blur-2xl" />
            <div className="relative">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Total Orders
              </p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-chocolate">
                {stats.total}
              </h2>
            </div>
          </div>

          <div className="glass relative overflow-hidden rounded-3xl p-5">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#ffc9b6]/80 to-[#fff7f1] blur-2xl" />
            <div className="relative">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                <Clock className="h-5 w-5" />
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Pending
              </p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-chocolate">
                {stats.pending}
              </h2>
            </div>
          </div>

          <div className="glass relative overflow-hidden rounded-3xl p-5">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#bfe8c8]/80 to-[#fff7f1] blur-2xl" />
            <div className="relative">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                <Truck className="h-5 w-5" />
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Delivered
              </p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-chocolate">
                {stats.delivered}
              </h2>
            </div>
          </div>
        </section>

        <section className="glass mt-6 rounded-3xl p-5 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-2xl text-chocolate">
                Order History
              </h2>
              <p className="text-sm text-muted-foreground">
                Search and view your placed orders.
              </p>
            </div>

            <div className="flex w-full items-center gap-3 rounded-full bg-white/70 px-4 py-3 shadow-soft lg:w-96">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cake, status, address..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {message && (
            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {message}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-dashed border-border bg-white/40 p-10 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                <Cake className="h-7 w-7" />
              </div>

              <h2 className="font-display text-3xl text-chocolate">
                No orders yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Your cake orders will appear here after you place an order.
              </p>

              <Button
                onClick={() => navigate("/")}
                className="mt-5 rounded-full bg-[#c7825a] hover:bg-[#a96846]"
              >
                Browse Cakes
              </Button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-dashed border-border bg-white/40 p-10 text-center text-sm text-muted-foreground">
              No matching orders found.
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-3xl bg-white/60 p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/50 text-chocolate">
                          <Cake className="h-5 w-5" />
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

                      <div className="mt-5 grid gap-3 text-sm text-foreground/80 md:grid-cols-2">
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

                        <p className="flex items-center gap-2">
                          <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                          Payment: {order.paymentStatus}
                        </p>

                        <p className="flex items-start gap-2 md:col-span-2">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                          <span>{order.deliveryAddress}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:items-end">
                      <p className="font-display text-3xl font-semibold text-chocolate">
                        Rs. {Number(order.totalPrice || 0).toFixed(2)}
                      </p>

                      <Button
                        onClick={() => navigate(`/orders/${order._id}`)}
                        variant="outline"
                        className="rounded-full bg-white/70"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredOrders.length > 0 && (
            <div className="mt-5 text-xs text-muted-foreground">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyOrders;