import { useState } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("token");

  const links = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "#" },
    { name: "Cake Makers", path: "#" },
    { name: "Custom Orders", path: "#" },
    ...(isLoggedIn
      ? [
          { name: "My Orders", path: "/my-orders" },
          { name: "Profile", path: "/profile" },
        ]
      : [{ name: "Login", path: "/login" }]),
  ];

  return (
    <header className="glass-nav fixed top-0 inset-x-0 z-50">
      <div className="container flex h-20 items-center justify-between">
        <a
          href="/"
          className="font-display text-3xl font-semibold tracking-tight text-chocolate"
        >
          🍰 Cakie
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-sm text-foreground/75 hover:text-chocolate transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn && (
            <a href="/profile" className="text-chocolate">
              <UserCircle size={30} />
            </a>
          )}

          <Button className="bg-chocolate text-primary-foreground hover:bg-chocolate/90 rounded-full px-6 h-11 shadow-soft">
            Become a Seller
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-chocolate"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-md px-6 py-5">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-sm text-foreground/75 hover:text-chocolate transition-colors"
              >
                {link.name}
              </a>
            ))}

            <Button className="bg-chocolate text-primary-foreground hover:bg-chocolate/90 rounded-full px-6 h-11 shadow-soft">
              Become a Seller
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};