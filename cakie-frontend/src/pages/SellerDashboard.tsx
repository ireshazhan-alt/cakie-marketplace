import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Cake,
  Plus,
  Store,
  PackageOpen,
  TrendingUp,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

type CakeItem = {
  _id: string;
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
  image?: string;
};

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [cakes, setCakes] = useState<CakeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMyCakes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/cakes/my-cakes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setMessage(data.message || "Failed to load cakes");
          return;
        }
        setCakes(data.cakes);
      } catch {
        setMessage("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCakes();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!confirm("Are you sure you want to delete this cake?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/cakes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to delete");
        return;
      }
      setCakes((prev) => prev.filter((c) => c._id !== id));
      setMessage("Cake deleted successfully.");
      setTimeout(() => setMessage(""), 2000);
    } catch {
      setMessage("Something went wrong.");
    }
  };

  return (
    <AdminLayout>
      {/* Header section */}
      <section className="glass relative overflow-hidden rounded-[2rem] p-6 lg:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#ffd6e4]/80 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[#d4a45f]/25 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
              <Store className="h-3.5 w-3.5" />
              Seller Dashboard
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-chocolate lg:text-5xl">
              My Cake Listings
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground lg:text-base">
              Manage all your cakes. Add new listings, edit details, or remove cakes from the marketplace.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/add-cake")}
              className="rounded-full bg-chocolate text-primary-foreground hover:bg-chocolate/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Cake
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="rounded-full bg-white/70"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="glass rounded-3xl p-6">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
            <Cake className="h-5 w-5" />
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Total Cakes</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-chocolate">{cakes.length}</h2>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
            <TrendingUp className="h-5 w-5" />
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Available</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-chocolate">
            {cakes.filter((c) => c.isAvailable).length}
          </h2>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
            <PackageOpen className="h-5 w-5" />
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Unavailable</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-chocolate">
            {cakes.filter((c) => !c.isAvailable).length}
          </h2>
        </div>
      </section>

      {/* Message */}
      {message && (
        <div className="mt-5 rounded-2xl border border-[#f1ded6] bg-white/80 px-5 py-3 text-sm text-chocolate">
          {message}
        </div>
      )}

      {/* Cake list */}
      <section className="glass mt-6 rounded-3xl p-6">
        <h2 className="font-display text-2xl text-chocolate mb-5">Your Cakes</h2>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading your cakes...</p>
        ) : cakes.length === 0 ? (
          <div className="rounded-2xl bg-white/60 p-6 text-center text-sm text-muted-foreground">
            You haven't added any cakes yet.{" "}
            <button onClick={() => navigate("/add-cake")} className="text-chocolate underline">
              Add your first cake
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cakes.map((cake) => (
              <div key={cake._id} className="glass rounded-2xl p-4">
                {cake.image && (
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="mb-3 h-36 w-full rounded-xl object-cover"
                  />
                )}
                <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-white/60 px-2 py-0.5 text-xs text-chocolate">
                  {cake.category}
                </div>
                <h3 className="font-display text-xl text-chocolate">{cake.name}</h3>
                <p className="mt-1 text-sm font-medium text-chocolate">LKR {cake.price}</p>
                <p className={`mt-1 text-xs ${cake.isAvailable ? "text-green-600" : "text-red-400"}`}>
                  {cake.isAvailable ? "Available" : "Unavailable"}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={() => navigate(`/edit-cake/${cake._id}`)}
                    className="flex-1 rounded-full bg-chocolate text-primary-foreground hover:bg-chocolate/90"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(cake._id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-full border-red-100 bg-white/70 text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default SellerDashboard;