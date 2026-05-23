import type { ReactNode } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Eye,
  LogOut,
  Menu,
  X,
  Cake,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type AdminLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { to: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/manage-orders", label: "Manage Orders", icon: ShoppingBag },
  { to: "/manage-users", label: "Manage Users", icon: Users },
  { to: "/", label: "User View", icon: Eye },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const SidebarBody = () => (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/50 shadow-soft">
            <Cake className="h-5 w-5 text-chocolate" />
          </div>

          <div>
            <p className="font-display text-2xl font-semibold leading-none text-chocolate">
              Cakie
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Admin Suite
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 px-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#ffe3ec] to-[#fff8f1] text-chocolate shadow-soft"
                  : "text-foreground/70 hover:bg-white/60 hover:text-chocolate"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-chocolate transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <div className="glass rounded-3xl p-5">
          <p className="font-display text-lg text-chocolate">
            Sweet days ahead
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage your cake marketplace with care.
          </p>

          <Button
            onClick={handleLogout}
            className="mt-4 w-full rounded-full bg-chocolate text-primary-foreground hover:bg-chocolate/90"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f1]">
      <div
        aria-hidden
        className="pointer-events-none fixed -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#ffd6e4]/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#d4a45f]/20 blur-3xl"
      />

      <aside className="fixed inset-y-4 left-4 z-40 hidden w-72 lg:block">
        <div className="glass h-full rounded-[2rem] border border-white/50">
          <SidebarBody />
        </div>
      </aside>

      <header className="glass-nav sticky top-0 z-40 lg:hidden">
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/50">
              <Cake className="h-4 w-4 text-chocolate" />
            </div>

            <span className="font-display text-2xl font-semibold text-chocolate">
              Cakie
            </span>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/70 text-chocolate shadow-soft"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-chocolate/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="absolute inset-y-3 left-3 w-72 max-w-[85vw]">
            <div className="glass relative h-full rounded-[2rem]">
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/70 text-chocolate"
              >
                <X className="h-4 w-4" />
              </button>

              <SidebarBody />
            </div>
          </aside>
        </div>
      )}

      <div className="lg:pl-80">
        <header className="sticky top-0 z-30 hidden items-center justify-between gap-4 px-8 pt-6 lg:flex">
          <div className="glass flex flex-1 items-center gap-3 rounded-full px-5 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search orders, customers, cakes..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <button className="grid h-12 w-12 place-items-center rounded-full bg-white/70 text-chocolate shadow-soft">
            <Bell className="h-[18px] w-[18px]" />
          </button>
        </header>

        <main className="px-5 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;