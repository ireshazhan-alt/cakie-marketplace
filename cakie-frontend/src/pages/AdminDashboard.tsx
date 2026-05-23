import { useEffect, useMemo, useState } from "react";
import {
  Users,
  ShoppingBag,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Cake,
  Sparkles,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

type User = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  isBlocked?: boolean;
};

type Order = {
  _id: string;
  cakeName?: string;
  quantity?: number;
  totalPrice?: number;
  orderStatus?: string;
  paymentStatus?: string;
  billingName?: string;
  createdAt?: string;
  customerId?: {
    name?: string;
    email?: string;
  };
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

const getAdminName = () => {
  try {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return "Admin";

    const user = JSON.parse(rawUser);
    return user?.name || "Admin";
  } catch {
    return "Admin";
  }
};

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const adminName = getAdminName();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login again.");
        setLoading(false);
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [usersResponse, ordersResponse] = await Promise.all([
          fetch("http://localhost:5000/api/users", { headers }),
          fetch("http://localhost:5000/api/orders", { headers }),
        ]);

        const usersData = await usersResponse.json();
        const ordersData = await ordersResponse.json();

        if (usersResponse.ok) {
          if (Array.isArray(usersData)) {
            setUsers(usersData);
          } else if (Array.isArray(usersData.users)) {
            setUsers(usersData.users);
          } else if (Array.isArray(usersData.data)) {
            setUsers(usersData.data);
          } else {
            setUsers([]);
          }
        }

        if (ordersResponse.ok) {
          if (Array.isArray(ordersData)) {
            setOrders(ordersData);
          } else if (Array.isArray(ordersData.orders)) {
            setOrders(ordersData.orders);
          } else if (Array.isArray(ordersData.data)) {
            setOrders(ordersData.data);
          } else {
            setOrders([]);
          }
        }

        if (!usersResponse.ok || !ordersResponse.ok) {
          setMessage("Some dashboard data could not be loaded.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong while loading dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = useMemo(() => {
    const pending = orders.filter(
      (order) => order.orderStatus?.toLowerCase() === "pending"
    ).length;

    const delivered = orders.filter(
      (order) => order.orderStatus?.toLowerCase() === "delivered"
    ).length;

    return {
      totalUsers: users.length,
      totalOrders: orders.length,
      pending,
      delivered,
    };
  }, [users, orders]);

  const statusBreakdown = useMemo(() => {
    const groups: Record<string, number> = {};

    orders.forEach((order) => {
      const key = order.orderStatus?.toLowerCase() || "unknown";
      groups[key] = (groups[key] || 0) + 1;
    });

    const total = orders.length || 1;

    return Object.entries(groups).map(([label, count]) => ({
      label,
      count,
      percent: Math.round((count / total) * 100),
    }));
  }, [orders]);

  const pendingOrders = useMemo(
    () =>
      orders
        .filter((order) => order.orderStatus?.toLowerCase() === "pending")
        .slice(0, 5),
    [orders]
  );

  const recentUsers = useMemo(
    () =>
      [...users]
        .sort((a, b) => {
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bDate - aDate;
        })
        .slice(0, 5),
    [users]
  );

  const statCards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      tint: "from-[#ffd6e4]/80 to-[#fff7f1]",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      tint: "from-[#f6d28b]/70 to-[#fff7f1]",
    },
    {
      label: "Pending Orders",
      value: stats.pending,
      icon: Clock,
      tint: "from-[#ffc9b6]/80 to-[#fff7f1]",
    },
    {
      label: "Delivered Orders",
      value: stats.delivered,
      icon: CheckCircle2,
      tint: "from-[#bfe8c8]/80 to-[#fff7f1]",
    },
  ];

  return (
    <AdminLayout>
      {message && (
        <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm text-red-600">
          {message}
        </div>
      )}

      <section className="glass relative overflow-hidden rounded-[2rem] p-6 lg:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#ffd6e4]/80 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-[#d4a45f]/25 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
              <Sparkles className="h-3.5 w-3.5" />
              Admin Overview
            </div>

            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-chocolate lg:text-5xl">
              Welcome back, {adminName}
            </h1>

            <p className="mt-3 max-w-xl text-sm text-muted-foreground lg:text-base">
              Here&apos;s a freshly baked summary of how the Cakie marketplace
              is performing today.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid h-28 w-28 place-items-center rounded-[2rem] bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/60 shadow-elevated">
              <Cake className="h-12 w-12 text-chocolate" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, tint }) => (
          <div
            key={label}
            className="glass group relative overflow-hidden rounded-3xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div
              aria-hidden
              className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-90 blur-2xl ${tint}`}
            />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {label}
                </p>

                <p className="mt-3 font-display text-4xl font-semibold text-chocolate">
                  {loading ? "—" : value.toLocaleString()}
                </p>
              </div>

              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-1.5 text-xs text-chocolate/70">
              <TrendingUp className="h-3.5 w-3.5" />
              Live from your bakery
            </div>
          </div>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-chocolate">
              Order Status
            </h2>

            <span className="text-xs text-muted-foreground">
              {orders.length} total
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {statusBreakdown.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No orders to display yet.
              </p>
            )}

            {statusBreakdown.map((status) => (
              <div key={status.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize text-foreground/80">
                    {status.label}
                  </span>

                  <span className="text-chocolate">
                    {status.count}{" "}
                    <span className="text-muted-foreground">
                      ({status.percent}%)
                    </span>
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-chocolate to-[#e68a62]"
                    style={{ width: `${status.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-chocolate">
              Latest Pending Orders
            </h2>

            <a
              href="/manage-orders"
              className="inline-flex items-center gap-1 text-xs text-chocolate hover:underline"
            >
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl">
            {pendingOrders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-white/40 p-8 text-center text-sm text-muted-foreground">
                No pending orders right now.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="py-2 pr-4 font-medium">Order</th>
                    <th className="py-2 pr-4 font-medium">Customer</th>
                    <th className="py-2 pr-4 font-medium">Date</th>
                    <th className="py-2 pr-4 font-medium">Amount</th>
                    <th className="py-2 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {pendingOrders.map((order) => {
                    const customer =
                      order.billingName ||
                      order.customerId?.name ||
                      "Guest customer";

                    return (
                      <tr
                        key={order._id}
                        className="border-t border-border/60 align-middle"
                      >
                        <td className="py-3 pr-4">
                          <p className="font-medium text-chocolate">
                            {order.cakeName || "Custom cake"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            #{String(order._id).slice(-6)}
                          </p>
                        </td>

                        <td className="py-3 pr-4 text-foreground/80">
                          {customer}
                        </td>

                        <td className="py-3 pr-4 text-foreground/70">
                          {formatDate(order.createdAt)}
                        </td>

                        <td className="py-3 pr-4 text-chocolate">
                          Rs. {Number(order.totalPrice || 0).toFixed(2)}
                        </td>

                        <td className="py-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffe0d2] px-2.5 py-1 text-xs text-chocolate">
                            <Clock className="h-3 w-3" />
                            Pending
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      <section className="glass mt-6 rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-chocolate">
            Recently Registered Users
          </h2>

          <a
            href="/manage-users"
            className="inline-flex items-center gap-1 text-xs text-chocolate hover:underline"
          >
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {recentUsers.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-white/40 p-8 text-center text-sm text-muted-foreground">
            No users registered yet.
          </div>
        ) : (
          <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {recentUsers.map((user) => {
              const initials = (user.name || user.email || "U")
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <li
                  key={user._id}
                  className="flex items-center gap-4 rounded-2xl bg-white/60 p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/50 font-medium text-chocolate">
                    {initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-chocolate">
                      {user.name || "Unnamed"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email || "No email"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      user.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminDashboard;