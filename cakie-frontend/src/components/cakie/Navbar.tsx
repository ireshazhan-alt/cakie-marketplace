import { Button } from "@/components/ui/button";

const links = ["Home", "Categories", "Cake Makers", "Custom Orders", "Login"];

export const Navbar = () => (
  <header className="glass-nav fixed top-0 inset-x-0 z-50">
    <div className="container flex h-20 items-center justify-between">
      <a href="#" className="font-display text-3xl font-semibold tracking-tight text-chocolate">
        🍰 Cakie
      </a>
      <nav className="hidden md:flex items-center gap-9">
        {links.map((l) => (
          <a key={l} href="#" className="text-sm text-foreground/75 hover:text-chocolate transition-colors">
            {l}
          </a>
        ))}
      </nav>
      <Button className="bg-chocolate text-primary-foreground hover:bg-chocolate/90 rounded-full px-6 h-11 shadow-soft">
        Become a Seller
      </Button>
    </div>
  </header>
);
