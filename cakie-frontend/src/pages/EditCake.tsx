import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Cake, Save } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CATEGORIES = ["Birthday", "Wedding", "Anniversary", "Cupcakes", "Bento", "Classic", "Custom", "Other"];

const EditCake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Birthday",
    image: "",
    isAvailable: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCake = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cakes/${id}`);
        const data = await res.json();
        if (!res.ok) {
          setMessage(data.message || "Failed to load cake");
          return;
        }
        const c = data.cake;
        setFormData({
          name: c.name,
          description: c.description,
          price: String(c.price),
          category: c.category,
          image: c.image || "",
          isAvailable: c.isAvailable,
        });
      } catch {
        setMessage("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchCake();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    try {
      setSaving(true);
      setMessage("");
      const res = await fetch(`http://localhost:5000/api/cakes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, price: Number(formData.price) }),
      });
      const data = await res.json();
      if (!res.ok) { setMessage(data.message || "Failed to update"); return; }
      navigate("/seller-dashboard");
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <section className="glass relative overflow-hidden rounded-[2rem] p-6 lg:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#ffd6e4]/80 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[#d4a45f]/25 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
              <Cake className="h-3.5 w-3.5" />
              Edit Cake
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-chocolate lg:text-5xl">
              Update Cake Details
            </h1>
            <p className="mt-3 text-sm text-muted-foreground lg:text-base">
              Make changes to your cake listing below.
            </p>
          </div>
          <Button onClick={() => navigate("/seller-dashboard")} variant="outline" className="rounded-full bg-white/70">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </section>

      {message && (
        <div className="mt-5 rounded-2xl border border-[#f1ded6] bg-white/80 px-5 py-3 text-sm text-chocolate">
          {message}
        </div>
      )}

      <section className="glass mt-6 rounded-3xl p-6 md:p-8">
        <h2 className="font-display text-2xl text-chocolate mb-6">Cake Details</h2>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading cake...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#5c4033]">Cake Name</label>
                <Input className="bg-white/70" type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#5c4033]">Price (LKR)</label>
                <Input className="bg-white/70" type="number" name="price" value={formData.price} onChange={handleChange} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#5c4033]">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-white/70 px-3 py-2 text-sm text-[#5c4033] outline-none focus:ring-1 focus:ring-chocolate"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#5c4033]">Image URL</label>
                <Input className="bg-white/70" type="text" name="image" value={formData.image} onChange={handleChange} />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#5c4033]">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-md border border-input bg-white/70 px-3 py-2 text-sm text-[#5c4033] outline-none focus:ring-1 focus:ring-chocolate resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="h-4 w-4 accent-chocolate"
                />
                <label htmlFor="isAvailable" className="text-sm font-medium text-[#5c4033]">
                  Available for orders
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={saving}
                className="rounded-full bg-chocolate text-primary-foreground hover:bg-chocolate/90"
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button onClick={() => navigate("/seller-dashboard")} variant="outline" className="rounded-full bg-white/70">
                Cancel
              </Button>
            </div>
          </>
        )}
      </section>
    </AdminLayout>
  );
};

export default EditCake;