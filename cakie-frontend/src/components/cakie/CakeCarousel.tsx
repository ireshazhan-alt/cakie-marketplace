import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Cake = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  seller?: {
    name: string;
  };
};

const Card = ({ cake }: { cake: Cake }) => {
  const orderUrl = `/place-order?cakeName=${encodeURIComponent(
    cake.name
  )}&price=${cake.price}`;

  return (
    <div className="glass group w-[320px] shrink-0 rounded-3xl overflow-hidden transition-smooth hover:-translate-y-2 hover:shadow-elevated"
      style={{ transition: "var(--transition-smooth)" }}>
      <div className="overflow-hidden">
        {cake.image ? (
          <img
            src={cake.image}
            alt={cake.name}
            loading="lazy"
            className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-64 w-full bg-[#ffecd9] flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {cake.category}
          </span>
        </div>

        <h3 className="font-display text-2xl text-chocolate leading-tight mb-1">
          {cake.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-5">by {cake.seller?.name || "Unknown"}</p>

        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-2xl text-chocolate">
            LKR {cake.price.toLocaleString()}
          </span>

          <a href={orderUrl}>
            <Button
              size="sm"
              className="bg-chocolate text-primary-foreground hover:bg-chocolate/90 rounded-full px-5"
            >
              Order
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export const CakeCarousel = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cakes");
        const data = await res.json();
        setCakes(data.cakes?.slice(0, 8) || []);
      } catch (error) {
        console.error("Failed to fetch cakes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="container text-center">
          <p className="text-muted-foreground">Loading cakes...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mb-14 flex items-end justify-between flex-wrap gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Featured
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-chocolate mt-3">
            Handpicked This Week
          </h2>
        </div>

        <p className="text-muted-foreground max-w-md">
          A curated selection of the most loved cakes from our top-rated artisans.
        </p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 px-4 md:px-0">
          {cakes.length > 0 ? (
            cakes.map((cake) => (
              <Card key={cake._id} cake={cake} />
            ))
          ) : (
            <p className="text-muted-foreground">No cakes available</p>
          )}
        </div>
      </div>
    </section>
  );
};