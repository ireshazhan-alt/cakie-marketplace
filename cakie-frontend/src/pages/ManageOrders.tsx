import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Cake,
  ClipboardList,
  Store,
  Timer,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

const ManageOrders = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <section className="glass relative overflow-hidden rounded-[2rem] p-6 lg:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#ffd6e4]/80 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[#d4a45f]/25 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
              <ClipboardList className="h-3.5 w-3.5" />
              Order Management
            </div>

            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-chocolate lg:text-5xl">
              Order Management Coming Soon
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-muted-foreground lg:text-base">
              This section will be completed after the Seller Management and
              Cake Management modules are finished. Once cakes are connected to
              sellers, each order can be assigned to the correct seller.
            </p>
          </div>

          <div className="hidden lg:grid h-28 w-28 place-items-center rounded-[2rem] bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/60 shadow-elevated">
            <Timer className="h-12 w-12 text-chocolate" strokeWidth={1.5} />
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="glass rounded-3xl p-6">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
            <Store className="h-5 w-5" />
          </div>

          <h2 className="font-display text-2xl text-chocolate">
            Seller Module Needed
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Sellers must be able to add and manage their cake listings before
            orders can be assigned correctly.
          </p>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
            <Cake className="h-5 w-5" />
          </div>

          <h2 className="font-display text-2xl text-chocolate">
            Cake Module Needed
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Each cake should have details like name, price, category, and
            seller ID before customers place real orders.
          </p>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-chocolate shadow-soft">
            <ClipboardList className="h-5 w-5" />
          </div>

          <h2 className="font-display text-2xl text-chocolate">
            Final Order Flow
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            After integration, customers will order cakes and sellers will
            accept, reject, or deliver only their own orders.
          </p>
        </div>
      </section>

      <section className="glass mt-6 rounded-3xl p-6">
        <h2 className="font-display text-2xl text-chocolate">
          Planned Flow
        </h2>

        <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
          <p className="rounded-2xl bg-white/60 p-4 shadow-soft">
            1. Seller adds cakes through the Seller/Cake Management module.
          </p>

          <p className="rounded-2xl bg-white/60 p-4 shadow-soft">
            2. Customer selects a real cake from the marketplace.
          </p>

          <p className="rounded-2xl bg-white/60 p-4 shadow-soft">
            3. Order stores customer ID, cake ID, and seller ID.
          </p>

          <p className="rounded-2xl bg-white/60 p-4 shadow-soft">
            4. Seller manages only the orders related to their own cakes.
          </p>

          <p className="rounded-2xl bg-white/60 p-4 shadow-soft">
            5. Admin can monitor all orders after the full integration.
          </p>
        </div>

        <div className="mt-6">
          <Button
            onClick={() => navigate("/admin-dashboard")}
            className="rounded-full bg-chocolate text-primary-foreground hover:bg-chocolate/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </section>
    </AdminLayout>
  );
};

export default ManageOrders;