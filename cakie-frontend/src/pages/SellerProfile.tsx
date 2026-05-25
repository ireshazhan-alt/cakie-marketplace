import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Cake, MapPin, Phone, Store } from "lucide-react";
import { Navbar } from "@/components/cakie/Navbar";
import { Button } from "@/components/ui/button";

type Seller = {
  _id: string;
  shopName: string;
  bio?: string;
  location?: string;
  phone?: string;
  user: { name: string; email: string };
};

type CakeItem = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
};

const SellerProfile = () => {
  const { id } = useParams(); // this is the seller's user _id
  const navigate = useNavigate();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [cakes, setCakes] = useState<CakeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch seller profile by id
        const sellerRes = await fetch(`http://localhost:5000/api/sellers/${id}`);
        const sellerData = await sellerRes.json();
        if (!sellerRes.ok) { setMessage("Seller not found."); return; }
        setSeller(sellerData.seller);

        // fetch all cakes and filter by this seller's user id
        const cakesRes = await fetch("http://localhost:5000/api/cakes");
        const cakesData = await cakesRes.json();
        const filtered = cakesData.cakes.filter(
          (c: CakeItem & { seller: { _id: string } }) => c.seller._id === id
        );
        setCakes(filtered);
      } catch {
        setMessage("Failed to load seller profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
          <div className="glass rounded-3xl p-10 text-center text-sm text-muted-foreground">Loading seller profile...</div>
        ) : message ? (
          <div className="glass rounded-3xl p-10 text-center text-sm text-chocolate">{message}</div>
        ) : seller ? (
          <>
            {/* Seller hero */}
            <section className="glass relative overflow-hidden rounded-[2rem] p-6 lg:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#ffd6e4]/80 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[#d4a45f]/25 blur-3xl" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
                <div className="grid h-24 w-24 place-items-center rounded-[2rem] bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/60 shadow-elevated">
                  <Store className="h-12 w-12 text-chocolate" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
                    <Store className="h-3.5 w-3.5" />
                    Cakie Seller
                  </div>
                  <h1 className="mt-3 font-display text-4xl font-semibold text-chocolate lg:text-5xl">
                    {seller.shopName}
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">by {seller.user?.name}</p>
                  {seller.bio && (
                    <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">{seller.bio}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Seller info cards */}
            <section className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="glass rounded-3xl p-5">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                  <Cake className="h-4 w-4" />
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Cakes Listed</p>
                <h2 className="mt-2 font-display text-3xl text-chocolate">{cakes.length}</h2>
              </div>

              {seller.location && (
                <div className="glass rounded-3xl p-5">
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Location</p>
                  <h2 className="mt-2 font-display text-2xl text-chocolate">{seller.location}</h2>
                </div>
              )}

              {seller.phone && (
                <div className="glass rounded-3xl p-5">
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
                    <Phone className="h-4 w-4" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Contact</p>
                  <h2 className="mt-2 font-display text-2xl text-chocolate">{seller.phone}</h2>
                </div>
              )}
            </section>

            {/* Cakes grid */}
            <section className="glass mt-6 rounded-3xl p-6">
              <h2 className="font-display text-2xl text-chocolate mb-5">Cakes by {seller.shopName}</h2>
              {cakes.length === 0 ? (
                <p className="text-sm text-muted-foreground">This seller hasn't listed any cakes yet.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cakes.map((cake) => (
                    <div
                      key={cake._id}
                      onClick={() => navigate(`/cake/${cake._id}`)}
                      className="glass cursor-pointer rounded-2xl p-4 transition-all hover:shadow-elevated"
                    >
                      {cake.image && (
                        <img src={cake.image} alt={cake.name} className="mb-3 h-36 w-full rounded-xl object-cover" />
                      )}
                      <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-white/60 px-2 py-0.5 text-xs text-chocolate">
                        {cake.category}
                      </div>
                      <h3 className="font-display text-xl text-chocolate">{cake.name}</h3>
                      <p className="mt-1 text-sm font-medium text-chocolate">LKR {cake.price.toLocaleString()}</p>
                      <p className={`mt-1 text-xs ${cake.isAvailable ? "text-green-600" : "text-red-400"}`}>
                        {cake.isAvailable ? "Available" : "Unavailable"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SellerProfile;