import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImg from "@/assets/hero-cake.jpg";

export const Hero = () => (
  <section className="relative pt-32 pb-24 overflow-hidden">
    <div
      className="absolute inset-0 -z-10"
      style={{ background: "var(--gradient-warm)" }}
    />
    <div className="container grid lg:grid-cols-2 gap-14 items-center">
      <div className="fade-up">
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
          Premium Cake Marketplace
        </span>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-chocolate mb-6">
          Discover Cakes Made for <em className="not-italic text-accent">Every Occasion</em>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
          Browse handcrafted birthday cakes, wedding cakes, cupcakes, and custom creations from trusted local cake makers.
        </p>

        <div className="glass rounded-full p-2 flex items-center gap-2 max-w-xl mb-8">
          <Input
            placeholder="Search cakes, categories, or cake makers"
            className="border-0 bg-transparent focus-visible:ring-0 text-base h-11 px-5"
          />
          <Button className="bg-chocolate hover:bg-chocolate/90 text-primary-foreground rounded-full h-11 px-7">
            Search
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-chocolate hover:bg-chocolate/90 text-primary-foreground rounded-full px-8 h-12">
            Explore Cakes
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-chocolate/20 hover:bg-secondary">
            Create Custom Order
          </Button>
        </div>
      </div>

      <div className="relative fade-up">
        <div className="absolute -inset-6 rounded-[2rem] bg-blush/40 blur-2xl -z-10" />
        <div className="glass rounded-[2rem] p-3 shadow-elevated" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <img
            src={heroImg}
            alt="Premium cake display on marble counter"
            width={1600}
            height={1200}
            className="rounded-[1.5rem] w-full h-[520px] object-cover"
          />
        </div>
        <div className="glass absolute -bottom-6 -left-6 rounded-2xl px-6 py-4 hidden sm:block">
          <div className="text-xs text-muted-foreground">Trusted by</div>
          <div className="font-display text-2xl text-chocolate">2,400+ bakers</div>
        </div>
      </div>
    </div>
  </section>
);
