import { Button } from "@/components/ui/button";
import chocolate from "@/assets/cake-chocolate.jpg";
import wedding from "@/assets/cake-wedding.jpg";
import strawberry from "@/assets/cake-strawberry-cupcakes.jpg";
import bento from "@/assets/cake-bento.jpg";
import anniversary from "@/assets/cake-anniversary.jpg";
import redvelvet from "@/assets/cake-redvelvet.jpg";
import theme from "@/assets/cake-theme.jpg";
import buttercream from "@/assets/cake-buttercream.jpg";

const cakes = [
  { img: chocolate, name: "Chocolate Birthday Cake", category: "Birthday", maker: "Maison Lila", price: 64, rating: "4.9 (218)" },
  { img: wedding, name: "Minimal Wedding Cake", category: "Wedding", maker: "Atelier Blanc", price: 320, rating: "5.0 (94)" },
  { img: strawberry, name: "Strawberry Cupcakes", category: "Cupcakes", maker: "Sugar & Sage", price: 28, rating: "4.8 (412)" },
  { img: bento, name: "Bento Celebration Cake", category: "Bento", maker: "Petit Four", price: 22, rating: "4.9 (305)" },
  { img: anniversary, name: "Anniversary Floral Cake", category: "Anniversary", maker: "Rose & Rye", price: 145, rating: "4.9 (167)" },
  { img: redvelvet, name: "Red Velvet Layer Cake", category: "Classic", maker: "Velvet Lane", price: 58, rating: "4.7 (289)" },
  { img: theme, name: "Kids Theme Cake", category: "Birthday", maker: "Crumb House", price: 72, rating: "4.8 (132)" },
  { img: buttercream, name: "Custom Buttercream Cake", category: "Custom", maker: "Atelier Blanc", price: 88, rating: "4.9 (201)" },
];

const Card = ({ c }: { c: typeof cakes[number] }) => (
  <div className="glass group w-[320px] shrink-0 rounded-3xl overflow-hidden transition-smooth hover:-translate-y-2 hover:shadow-elevated"
       style={{ transition: "var(--transition-smooth)" }}>
    <div className="overflow-hidden">
      <img src={c.img} alt={c.name} loading="lazy" width={800} height={800}
           className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{c.category}</span>
        <span className="text-xs text-muted-foreground">{c.rating}</span>
      </div>
      <h3 className="font-display text-2xl text-chocolate leading-tight mb-1">{c.name}</h3>
      <p className="text-sm text-muted-foreground mb-5">by {c.maker}</p>
      <div className="flex items-center justify-between">
        <span className="font-display text-2xl text-chocolate">${c.price}</span>
        <Button size="sm" variant="ghost" className="text-chocolate hover:bg-secondary rounded-full">
          View Details →
        </Button>
      </div>
    </div>
  </div>
);

export const CakeCarousel = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="container mb-14 flex items-end justify-between flex-wrap gap-4">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Featured</span>
        <h2 className="font-display text-4xl md:text-5xl text-chocolate mt-3">Handpicked This Week</h2>
      </div>
      <p className="text-muted-foreground max-w-md">
        A curated selection of the most loved cakes from our top-rated artisans.
      </p>
    </div>

    <div className="marquee-pause overflow-hidden relative"
         style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
      <div className="marquee flex gap-6 w-max py-4 px-6">
        {[...cakes, ...cakes].map((c, i) => <Card key={i} c={c} />)}
      </div>
    </div>
  </section>
);
