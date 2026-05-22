import { Button } from "@/components/ui/button";
import m1 from "@/assets/maker-1.jpg";
import m2 from "@/assets/maker-2.jpg";
import m3 from "@/assets/maker-3.jpg";

const makers = [
  { name: "Isabella Moreau", img: m1, location: "Brooklyn, NY", spec: "Wedding & Floral Cakes", listed: 48, rating: "4.9 (312)" },
  { name: "Lucas Bernard", img: m2, location: "San Francisco, CA", spec: "Buttercream Artistry", listed: 36, rating: "5.0 (198)" },
  { name: "Amelia Hart", img: m3, location: "Austin, TX", spec: "Custom Celebration Cakes", listed: 62, rating: "4.8 (421)" },
];

export const CakeMakers = () => (
  <section className="py-24">
    <div className="container">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Artisans</span>
          <h2 className="font-display text-4xl md:text-5xl text-chocolate mt-3">Meet Our Cake Makers</h2>
        </div>
        <Button variant="ghost" className="text-chocolate hover:bg-secondary rounded-full">View all makers →</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-7">
        {makers.map((m) => (
          <div key={m.name} className="glass rounded-3xl p-7 transition-smooth hover:-translate-y-1"
               style={{ transition: "var(--transition-smooth)" }}>
            <div className="flex items-center gap-4 mb-6">
              <img src={m.img} alt={m.name} loading="lazy" width={600} height={600}
                   className="w-20 h-20 rounded-full object-cover ring-2 ring-cream" />
              <div>
                <h3 className="font-display text-2xl text-chocolate leading-tight">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.location}</p>
              </div>
            </div>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Specialization</span>
                <span className="text-chocolate font-medium">{m.spec}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cakes listed</span>
                <span className="text-chocolate font-medium">{m.listed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating</span>
                <span className="text-chocolate font-medium">{m.rating}</span>
              </div>
            </div>
            <Button className="w-full bg-chocolate hover:bg-chocolate/90 text-primary-foreground rounded-full h-11">
              View Profile
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
