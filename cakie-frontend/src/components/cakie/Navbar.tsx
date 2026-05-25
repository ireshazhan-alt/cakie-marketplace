import { useState } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isLoggedIn = !!token;
  const role = user?.role;

  const customerLinks = [
    { name: "Home", path: "/" },
    { name: "My Orders", path: "/my-orders" },
    { name: "Profile", path: "/profile" },
  ];

  const adminLinks = [
    { name: "Home", path: "/" },
    { name: "Admin Dashboard", path: "/admin-dashboard" },
    { name: "Manage Orders", path: "/manage-orders" },
    { name: "Manage Users", path: "/manage-users" },
    { name: "Profile", path: "/profile" },
  ];

  const sellerLinks = [
    { name: "Home", path: "/" },
    { name: "Seller Dashboard", path: "/seller-dashboard" },
    { name: "My Cakes", path: "/manage-cakes" },
    { name: "Manage Orders", path: "/manage-orders" },
    { name: "Profile", path: "/profile" },
  ];

  const guestLinks = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
  ];

  let links = guestLinks;
  if (isLoggedIn && role === "admin") links = adminLinks;
  else if (isLoggedIn && role === "seller") links = sellerLinks;
  else if (isLoggedIn && role === "customer") links = customerLinks;

  const handleBecomeSeller = () => {
    navigate("/register");
    setIsOpen(false);
  };

  return (
    <header className="glass-nav fixed top-0 inset-x-0 z-50">
      <div className="container flex h-20 items-center justify-between">

        <a href="/" className="font-display text-3xl font-semibold tracking-tight text-chocolate">
          Cakie
        </a>

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

        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn && (
            <a href="/profile" className="text-chocolate">
              <UserCircle size={30} />
            </a>
          )}
          {(!isLoggedIn || role === "customer") && (
            <Button
              onClick={handleBecomeSeller}
              className="bg-chocolate text-primary-foreground hover:bg-chocolate/90 rounded-full px-6 h-11 shadow-soft"
            >
              Become a Seller
            </Button>
          )}
        </div>

        <button
          className="lg:hidden text-chocolate"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-md px-6 py-5">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-sm text-foreground/75 hover:text-chocolate transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {(!isLoggedIn || role === "customer") && (
              <Button
                onClick={handleBecomeSeller}
                className="bg-chocolate text-primary-foreground hover:bg-chocolate/90 rounded-full px-6 h-11 shadow-soft"
              >
                Become a Seller
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};