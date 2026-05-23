import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/cakie/Navbar";
import { Footer } from "@/components/cakie/Footer";
import { Button } from "@/components/ui/button";
import { Users, ClipboardList, PackageCheck } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-32">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Admin Panel
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-chocolate mt-3">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Manage users, monitor orders, and control the Cakie marketplace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-3xl border bg-white/80 backdrop-blur-md shadow-soft p-6">
            <Users className="text-chocolate mb-4" size={34} />
            <h2 className="text-xl font-semibold text-chocolate">
              Manage Users
            </h2>
            <p className="text-muted-foreground mt-2 mb-5">
              View registered customers, sellers, and admins.
            </p>
            <Button
              className="rounded-full bg-chocolate hover:bg-chocolate/90"
              onClick={() => navigate("/manage-users")}
            >
              Open Users
            </Button>
          </div>

          <div className="rounded-3xl border bg-white/80 backdrop-blur-md shadow-soft p-6">
            <ClipboardList className="text-chocolate mb-4" size={34} />
            <h2 className="text-xl font-semibold text-chocolate">
              Manage Orders
            </h2>
            <p className="text-muted-foreground mt-2 mb-5">
              Accept, reject, and update customer cake orders.
            </p>
            <Button
              className="rounded-full bg-chocolate hover:bg-chocolate/90"
              onClick={() => navigate("/manage-orders")}
            >
              Open Orders
            </Button>
          </div>

          <div className="rounded-3xl border bg-white/80 backdrop-blur-md shadow-soft p-6">
            <PackageCheck className="text-chocolate mb-4" size={34} />
            <h2 className="text-xl font-semibold text-chocolate">
              Platform Status
            </h2>
            <p className="text-muted-foreground mt-2 mb-5">
              Basic marketplace overview. More stats can be added later.
            </p>
            <Button className="rounded-full" variant="outline" disabled>
              Coming Soon
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;