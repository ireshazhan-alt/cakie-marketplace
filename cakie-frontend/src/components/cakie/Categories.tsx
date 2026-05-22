import chocolate from "@/assets/cake-chocolate.jpg";
import wedding from "@/assets/cake-wedding.jpg";
import strawberry from "@/assets/cake-strawberry-cupcakes.jpg";
import bento from "@/assets/cake-bento.jpg";
import anniversary from "@/assets/cake-anniversary.jpg";
import buttercream from "@/assets/cake-buttercream.jpg";

const cats = [
  { name: "Birthday Cakes", count: "320 cakes", img: chocolate },
  { name: "Wedding Cakes", count: "118 cakes", img: wedding },
  { name: "Cupcakes", count: "245 cakes", img: strawberry },
  { name: "Bento Cakes", count: "92 cakes", img: bento },
  { name: "Anniversary Cakes", count: "176 cakes", img: anniversary },
  { name: "Custom Cakes", count: "410 cakes", img: buttercream },
];

export const Categories = () => (
  <section className="py-24" style={{ background: "var(--gradient-soft)" }}>
    <div className="container">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Browse</span>
        <h2 className="font-display text-4xl md:text-5xl text-chocolate mt-3">Shop by Category</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {cats.map((c) => (
          <a key={c.name} href="#" className="glass group rounded-3xl overflow-hidden block transition-smooth hover:-translate-y-1"
             style={{ transition: "var(--transition-smooth)" }}>
            <div className="relative h-72 overflow-hidden">
              <img src={c.img} alt={c.name} loading="lazy" width={800} height={800}
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate/70 via-chocolate/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-cream">
                <h3 className="font-display text-3xl mb-1">{c.name}</h3>
                <p className="text-sm opacity-80">{c.count}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
