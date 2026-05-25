import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cake, Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

type CakeItem = {
  _id: string;
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
};

const ManageCakes = () => {
  const navigate = useNavigate();
  const [cakes, setCakes] = useState<CakeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMyCakes = async () => {
      const token = localStorage.getItem("token");
      if (!token) { navigate("/login"); return; }

      try {
        const res = await fetch("http://localhost:5000/api/cakes/my-cakes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setCakes(data.cakes);
        else setMessage(data.message || "Failed to load cakes.");
      } catch {
        setMessage("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCakes();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this cake?")) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/cakes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setCakes((prev) => prev.filter((c) => c._id !== id));
        setMessage("Cake deleted.");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage(data.message || "Failed to delete.");
      }
    } catch {
      setMessage("Something went wrong.");
    }
  };

  return (
    <AdminLayout>
      <section className="glass relative overflow-hidden rounded-[2rem] p-6 lg:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#ffd6e4]/80 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[#d4a45f]/25 blur-3xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
              <Cake className="h-3.5 w-3.5" />
              Cake Management
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold text-chocolate lg:text-5xl">
              My Cakes
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage all your cake listings here.
            </p>
          </div>

          <Button
            onClick={() => navigate("/add-cake")}
            className="rounded-full bg-chocolate text-primary-foreground hover:bg-chocolate/90 self-start lg:self-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Cake
          </Button>
        </div>
      </section>

      {message && (
        <div className="mt-4 rounded-2xl border border-[#f1ded6] bg-white/80 px-5 py-3 text-sm text-chocolate">
          {message}
        </div>
      )}

      <section className="glass mt-6 rounded-3xl p-6">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading your cakes...</p>
        ) : cakes.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground text-sm">You have no cakes yet.</p>
            <Button
              onClick={() => navigate("/add-cake")}
              className="mt-4 rounded-full bg-chocolate text-primary-foreground hover:bg-chocolate/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Cake
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/40 text-left text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">Price</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/30">
                {cakes.map((cake) => (
                  <tr key={cake._id} className="group">
                    <td className="py-4 pr-4 font-medium text-chocolate">{cake.name}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{cake.category}</td>
                    <td className="py-4 pr-4 text-chocolate">LKR {cake.price.toLocaleString()}</td>
                    <td className="py-4 pr-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        cake.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {cake.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full bg-white/70"
                          onClick={() => navigate(`/edit-cake/${cake._id}`)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full bg-white/70 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
                          onClick={() => handleDelete(cake._id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6">
          <Button
            onClick={() => navigate("/seller-dashboard")}
            variant="outline"
            className="rounded-full bg-white/70"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </section>
    </AdminLayout>
  );
};

export default ManageCakes;