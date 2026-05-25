import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Cake, MapPin, ShoppingBag, Store } from "lucide-react";
import { Navbar } from "@/components/cakie/Navbar";
import { Button } from "@/components/ui/button";

type CakeItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  seller: { _id: string; name: string; email: string };
};

const CakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cake, setCake] = useState<CakeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCake = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cakes/${id}`);
        const data = await res.json();
        if (!res.ok) { setMessage("Cake not found."); return; }
        setCake(data.cake);
      } catch {
        setMessage("Failed to load cake.");
      } finally {
        setLoading(false);
      }
    };
    fetchCake();
  }, [id]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f1]">
      <Navbar />
      <div aria-hidden className="pointer-events-none fixed -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#ffd6e4]/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none fixed -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#d4a45f]/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-10">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-6 rounded-full bg-white/70">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {loading ? (
          <div className="glass rounded-3xl p-10 text-center text-sm text-muted-foreground">Loading cake details...</div>
        ) : message ? (
          <div className="glass rounded-3xl p-10 text-center text-sm text-chocolate">{message}</div>
        ) : cake ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Image */}
            <section className="glass overflow-hidden rounded-[2rem]">
              {cake.image ? (
                <img src={cake.image} alt={cake.name} className="h-full w-full object-cover" style={{ minHeight: 320 }} />
              ) : (
                <div className="flex h-80 items-center justify-center bg-[#ffecd9]">
                  <Cake className="h-20 w-20 text-chocolate/30" strokeWidth={1} />
                </div>
              )}
            </section>

            {/* Details */}
            <div className="flex flex-col gap-5">
              <section className="glass relative overflow-hidden rounded-[2rem] p-6">
                <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#ffd6e4]/80 blur-3xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
                    {cake.category}
                  </div>
                  <h1 className="mt-3 font-display text-4xl font-semibold text-chocolate">{cake.name}</h1>
                  <p className="mt-2 text-2xl font-semibold text-chocolate">LKR {cake.price.toLocaleString()}</p>
                  <p className={`mt-2 text-sm font-medium ${cake.isAvailable ? "text-green-600" : "text-red-400"}`}>
                    {cake.isAvailable ? "Available for orders" : "Currently unavailable"}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{cake.description}</p>
                </div>
              </section>

              {/* Seller info */}
              <section className="glass rounded-3xl p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                    <Store className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Sold by</p>
                    <p className="font-display text-xl text-chocolate">{cake.seller?.name}</p>
                    <button
                      onClick={() => navigate(`/seller-profile/${cake.seller?._id}`)}
                      className="mt-0.5 flex items-center gap-1 text-xs text-chocolate underline"
                    >
                      <MapPin className="h-3 w-3" />
                      View seller profile
                    </button>
                  </div>
                </div>
              </section>

              {/* Order button */}
              <Button
                disabled={!cake.isAvailable}
                onClick={() => navigate("/place-order")}
                className="w-full rounded-full bg-chocolate py-6 text-base text-primary-foreground hover:bg-chocolate/90 disabled:opacity-50"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {cake.isAvailable ? "Place an Order" : "Unavailable"}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CakeDetails;