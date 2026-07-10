import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Store, MapPin, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SellerOnboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: "",
    bio: "",
    location: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setUserLoading(false);
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.shopName.trim()) {
      setMessage("Shop name is required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:5000/api/sellers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create seller profile");
        return;
      }

      setMessage("Seller profile created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/seller-dashboard");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff7f1]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f1] px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none fixed -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#ffd6e4]/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#d4a45f]/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-6 rounded-full bg-white/70"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="glass relative overflow-hidden rounded-[2rem] p-6 lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#ffd6e4]/80 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[#d4a45f]/25 blur-3xl"
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
              <Store className="h-3.5 w-3.5" />
              Seller Registration
            </div>

            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-chocolate lg:text-5xl">
              Create Your Shop Profile
            </h1>

            <p className="mt-3 text-sm text-muted-foreground lg:text-base">
              Tell us about your cake shop so customers can find and order from
              you.
            </p>
          </div>
        </div>

        {message && (
          <div
            className={`mt-5 rounded-2xl border px-5 py-3 text-sm ${
              message.includes("successfully")
                ? "border-green-200 bg-green-50/80 text-green-700"
                : "border-[#f1ded6] bg-white/80 text-chocolate"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass mt-6 rounded-3xl p-6 md:p-8">
          <h2 className="font-display text-2xl text-chocolate mb-6">
            Shop Details
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Shop Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#5c4033]">
                Shop Name *
              </label>
              <Input
                className="bg-white/70"
                type="text"
                name="shopName"
                placeholder="e.g., Sweet Delights Bakery"
                value={formData.shopName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#5c4033]">
                About Your Shop
              </label>
              <textarea
                className="w-full bg-white/70 border border-input rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-chocolate/20"
                name="bio"
                placeholder="Tell customers about your cakes, specialties, and what makes you unique..."
                rows={4}
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                <MapPin className="h-4 w-4" />
                Location
              </label>
              <Input
                className="bg-white/70"
                type="text"
                name="location"
                placeholder="e.g., Brooklyn, NY"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                <Phone className="h-4 w-4" />
                Phone Number
              </label>
              <Input
                className="bg-white/70"
                type="tel"
                name="phone"
                placeholder="e.g., +1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-chocolate text-primary-foreground hover:bg-chocolate/90 disabled:opacity-50"
            >
              {loading ? "Creating Profile..." : "Create Seller Profile"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              className="rounded-full bg-white/70"
            >
              Cancel
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            After creating your profile, you'll be able to add cakes and manage
            your orders from your seller dashboard.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SellerOnboarding;
