import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Cake, Save } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CATEGORIES = ["Birthday", "Wedding", "Anniversary", "Cupcakes", "Bento", "Classic", "Custom", "Other"];

const AddCake = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Birthday",
    image: "",
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setMessage("Please fill in all required fields.");
      return;
    }
    try {
      setSaving(true);
      setMessage("");
      const res = await fetch("http://localhost:5000/api/cakes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, price: Number(formData.price) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to add cake");
        return;
      }
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
              Add New Cake
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-chocolate lg:text-5xl">
              List a New Cake
            </h1>
            <p className="mt-3 text-sm text-muted-foreground lg:text-base">
              Fill in the details below to add a new cake to the marketplace.
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#5c4033]">Cake Name *</label>
            <Input
              className="bg-white/70"
              type="text"
              name="name"
              placeholder="e.g. Strawberry Dream"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#5c4033]">Price (LKR) *</label>
            <Input
              className="bg-white/70"
              type="number"
              name="price"
              placeholder="e.g. 3500"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#5c4033]">Category *</label>
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
            <Input
              className="bg-white/70"
              type="text"
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#5c4033]">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your cake — flavours, size, special details..."
              rows={4}
              className="w-full rounded-md border border-input bg-white/70 px-3 py-2 text-sm text-[#5c4033] outline-none focus:ring-1 focus:ring-chocolate resize-none"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="rounded-full bg-chocolate text-primary-foreground hover:bg-chocolate/90"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Add Cake"}
          </Button>
          <Button
            onClick={() => navigate("/seller-dashboard")}
            variant="outline"
            className="rounded-full bg-white/70"
          >
            Cancel
          </Button>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AddCake;