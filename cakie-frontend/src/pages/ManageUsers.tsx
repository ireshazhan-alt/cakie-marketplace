import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Ban,
  CheckCircle2,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  isBlocked?: boolean;
  createdAt?: string;
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

const ManageUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else if (Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          setUsers([]);
        }
      } else {
        setMessage(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while loading users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [navigate]);

  const handleBlockToggle = async (userId: string, currentStatus?: boolean) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}/block`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isBlocked: !currentStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? { ...user, isBlocked: !currentStatus }
              : user
          )
        );
      } else {
        setMessage(data.message || "Failed to update user status");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while updating user status.");
    }
  };

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phone?.toLowerCase().includes(term) ||
        user.role?.toLowerCase().includes(term)
      );
    });
  }, [users, searchTerm]);

  const stats = useMemo(() => {
    const activeUsers = users.filter((user) => !user.isBlocked).length;
    const blockedUsers = users.filter((user) => user.isBlocked).length;
    const sellers = users.filter((user) => user.role === "seller").length;

    return {
      totalUsers: users.length,
      activeUsers,
      blockedUsers,
      sellers,
    };
  }, [users]);

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
              <Users className="h-3.5 w-3.5" />
              User Control
            </div>

            <h1 className="mt-4 font-display text-4xl font-semibold text-chocolate lg:text-5xl">
              Manage Users
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-muted-foreground lg:text-base">
              View customers and sellers, monitor account status, and block or
              unblock users when needed.
            </p>
          </div>

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
            <ShieldCheck className="h-5 w-5 text-chocolate" />
            <div>
              <p className="text-sm font-medium text-chocolate">
                Admin Protected
              </p>
              <p className="text-xs text-muted-foreground">
                Backend role guard active
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#ffd6e4]/80 to-[#fff7f1] blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Total Users
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-chocolate">
                {loading ? "—" : stats.totalUsers}
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#bfe8c8]/80 to-[#fff7f1] blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Active
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-chocolate">
                {loading ? "—" : stats.activeUsers}
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#ffc9b6]/80 to-[#fff7f1] blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Blocked
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-chocolate">
                {loading ? "—" : stats.blockedUsers}
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
              <Ban className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#f6d28b]/70 to-[#fff7f1] blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Sellers
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-chocolate">
                {loading ? "—" : stats.sellers}
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
              <UserRound className="h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      <section className="glass mt-6 rounded-3xl p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl text-chocolate">
              Registered Users
            </h2>
            <p className="text-sm text-muted-foreground">
              Search and manage marketplace accounts.
            </p>
          </div>

          <div className="flex w-full items-center gap-3 rounded-full bg-white/70 px-4 py-3 shadow-soft lg:w-96">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, email, phone, role..."
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
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-white/40 p-8 text-center text-sm text-muted-foreground">
            No users found.
          </div>
        ) : (
          <>
            <div className="mt-5 hidden overflow-hidden rounded-2xl lg:block">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="py-3 pr-4 font-medium">User</th>
                    <th className="py-3 pr-4 font-medium">Contact</th>
                    <th className="py-3 pr-4 font-medium">Role</th>
                    <th className="py-3 pr-4 font-medium">Joined</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 text-right font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => {
                    const initials = (user.name || user.email || "U")
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <tr
                        key={user._id}
                        className="border-t border-border/60 align-middle"
                      >
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/50 font-medium text-chocolate">
                              {initials}
                            </div>

                            <div>
                              <p className="font-medium text-chocolate">
                                {user.name || "Unnamed"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                #{String(user._id).slice(-6)}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 pr-4">
                          <div className="space-y-1 text-foreground/80">
                            <p className="flex items-center gap-2">
                              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                              {user.email}
                            </p>
                            <p className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              {user.phone || "Not provided"}
                            </p>
                          </div>
                        </td>

                        <td className="py-4 pr-4">
                          <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-medium capitalize text-chocolate shadow-soft">
                            {user.role || "customer"}
                          </span>
                        </td>

                        <td className="py-4 pr-4 text-muted-foreground">
                          {formatDate(user.createdAt)}
                        </td>

                        <td className="py-4 pr-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                              user.isBlocked
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {user.isBlocked ? "Blocked" : "Active"}
                          </span>
                        </td>

                        <td className="py-4 text-right">
                          <Button
                            size="sm"
                            variant={user.isBlocked ? "outline" : "destructive"}
                            className="rounded-full"
                            onClick={() =>
                              handleBlockToggle(user._id, user.isBlocked)
                            }
                          >
                            {user.isBlocked ? "Unblock" : "Block"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-5 grid gap-3 lg:hidden">
              {filteredUsers.map((user) => {
                const initials = (user.name || user.email || "U")
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                return (
                  <div
                    key={user._id}
                    className="rounded-3xl bg-white/60 p-4 shadow-soft"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/50 font-medium text-chocolate">
                        {initials}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-chocolate">
                              {user.name || "Unnamed"}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {user.email}
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
                        </div>

                        <div className="mt-3 grid gap-1 text-sm text-muted-foreground">
                          <p>Phone: {user.phone || "Not provided"}</p>
                          <p className="capitalize">
                            Role: {user.role || "customer"}
                          </p>
                          <p>Joined: {formatDate(user.createdAt)}</p>
                        </div>

                        <Button
                          size="sm"
                          variant={user.isBlocked ? "outline" : "destructive"}
                          className="mt-4 rounded-full"
                          onClick={() =>
                            handleBlockToggle(user._id, user.isBlocked)
                          }
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!loading && filteredUsers.length > 0 && (
          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
            <p>
              Showing {filteredUsers.length} of {users.length} users
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
    </AdminLayout>
  );
};

export default ManageUsers;