import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  isBlocked: boolean;
};

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setUser(data.user);
      } catch (error) {
        setMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff7f1]">
        <p className="text-[#5c4033] font-medium">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff7f1] px-4 py-28">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#5c4033]">
                My Profile
              </h1>

              <p className="text-gray-500 mt-2">
                View your personal details.
              </p>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-full"
            >
              Logout
            </Button>
          </div>

          {message && (
            <p className="text-sm text-center text-red-500 mb-4">
              {message}
            </p>
          )}

          {user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <Input
                  className="mt-2"
                  type="text"
                  value={user.name}
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <Input
                  className="mt-2"
                  type="email"
                  value={user.email}
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <Input
                  className="mt-2"
                  type="text"
                  value={user.phone || "Not provided"}
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Role
                </label>
                <Input
                  className="mt-2 capitalize"
                  type="text"
                  value={user.role}
                  readOnly
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Address
                </label>
                <Input
                  className="mt-2"
                  type="text"
                  value={user.address || "Not provided"}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-5">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold text-[#5c4033] mt-2">0</h2>
          </div>

          <div className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-5">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <h2 className="text-3xl font-bold text-[#5c4033] mt-2">0</h2>
          </div>

          <div className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-5">
            <p className="text-sm text-gray-500">Completed Orders</p>
            <h2 className="text-3xl font-bold text-[#5c4033] mt-2">0</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;