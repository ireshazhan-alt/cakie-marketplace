import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/cakie/Navbar";
import { Footer } from "@/components/cakie/Footer";
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

const ManageUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
        setUsers(data);
      } else {
        setMessage(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
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
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-32">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Admin
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-chocolate mt-3">
            Manage Users
          </h1>
          <p className="text-muted-foreground mt-3">
            View, block, and unblock registered users in the Cakie marketplace.
          </p>
        </div>

        {loading && <p className="text-muted-foreground">Loading users...</p>}

        {message && <p className="mb-4 text-sm text-chocolate">{message}</p>}

        {!loading && users.length === 0 && (
          <div className="rounded-3xl border bg-white/80 p-8 text-center shadow-soft">
            <p className="text-muted-foreground">No users found.</p>
          </div>
        )}

        {!loading && users.length > 0 && (
          <div className="overflow-x-auto rounded-3xl border bg-white/80 backdrop-blur-md shadow-lg">
            <table className="w-full text-left">
              <thead className="border-b bg-secondary/40">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-chocolate">
                    Name
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-chocolate">
                    Email
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-chocolate">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-chocolate">
                    Role
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-chocolate">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-chocolate">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b last:border-b-0">
                    <td className="px-6 py-4 font-medium">{user.name}</td>

                    <td className="px-6 py-4 text-muted-foreground">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-muted-foreground">
                      {user.phone || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-secondary px-3 py-1 text-sm text-chocolate">
                        {user.role || "customer"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          user.isBlocked
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ManageUsers;