import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Home,
  LogOut,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserCircle,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type User = {
  _id?: string;
  id?: string;
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
        console.error(error);
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

  const handleBack = () => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff7f1]">
        <div className="glass rounded-3xl px-8 py-6 text-center">
          <UserCircle className="mx-auto mb-3 text-chocolate" size={36} />
          <p className="text-[#5c4033] font-medium">Loading profile...</p>
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

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Button
            onClick={handleBack}
            variant="outline"
            className="rounded-full bg-white/70"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-full border-red-100 bg-white/70 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
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

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-20 place-items-center rounded-[1.7rem] bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/60 text-chocolate shadow-elevated">
                <UserCircle size={44} strokeWidth={1.5} />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Account Profile
                </div>

                <h1 className="mt-3 font-display text-4xl font-semibold text-chocolate md:text-5xl">
                  {user?.name || "My Profile"}
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                  View your personal account details and current access role.
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl px-4 py-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-chocolate" />
                <div>
                  <p className="text-sm font-medium text-chocolate">
                    {user?.isBlocked ? "Blocked Account" : "Active Account"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Role: {user?.role || "customer"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {message && (
          <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm text-red-600">
            {message}
          </div>
        )}

        {user && (
          <>
            <section className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="glass rounded-3xl p-5">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                  <UserRound className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Role
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold capitalize text-chocolate">
                  {user.role}
                </h2>
              </div>

              <div className="glass rounded-3xl p-5">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Status
                </p>
                <h2
                  className={`mt-2 font-display text-3xl font-semibold ${
                    user.isBlocked ? "text-red-600" : "text-green-700"
                  }`}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </h2>
              </div>

              <div className="glass rounded-3xl p-5">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                  <Home className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Account Type
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold capitalize text-chocolate">
                  Cakie {user.role}
                </h2>
              </div>
            </section>

            <section className="glass mt-6 rounded-3xl p-6 md:p-8">
              <div className="mb-6">
                <h2 className="font-display text-3xl text-chocolate">
                  Personal Details
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  These details are saved in your Cakie account.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                    <UserRound className="h-4 w-4" />
                    Full Name
                  </label>
                  <Input
                    className="bg-white/70"
                    type="text"
                    value={user.name}
                    readOnly
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </label>
                  <Input
                    className="bg-white/70"
                    type="email"
                    value={user.email}
                    readOnly
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <Input
                    className="bg-white/70"
                    type="text"
                    value={user.phone || "Not provided"}
                    readOnly
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                    <ShieldCheck className="h-4 w-4" />
                    Role
                  </label>
                  <Input
                    className="bg-white/70 capitalize"
                    type="text"
                    value={user.role}
                    readOnly
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                    <MapPin className="h-4 w-4" />
                    Address
                  </label>
                  <Input
                    className="bg-white/70"
                    type="text"
                    value={user.address || "Not provided"}
                    readOnly
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;