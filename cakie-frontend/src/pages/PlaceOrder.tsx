import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Cake,
  CreditCard,
  MapPin,
  PackageCheck,
  Phone,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const cakeName = searchParams.get("cakeName") || "";
  const unitPrice = Number(searchParams.get("price")) || 0;

  const [quantity, setQuantity] = useState(1);
  const [billingName, setBillingName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = unitPrice * quantity;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before placing an order");
      navigate("/login");
      return;
    }

    if (!cakeName || unitPrice <= 0) {
      setMessage("Please select a cake from the homepage before ordering.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cakeName,
          quantity,
          totalPrice,
          deliveryAddress,
          billingName,
          phoneNumber,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Order placed successfully! Redirecting to My Orders...");

        setTimeout(() => {
          navigate("/my-orders");
        }, 1000);
      } else {
        setMessage(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f1] px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none fixed -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#ffd6e4]/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#d4a45f]/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="rounded-full bg-white/70"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={() => navigate("/my-orders")}
            variant="outline"
            className="rounded-full bg-white/70"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            My Orders
          </Button>
        </div>

        <section className="glass relative overflow-hidden rounded-[2rem] p-6 shadow-soft md:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#ffd6e4]/80 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-[#d4a45f]/25 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs text-chocolate shadow-soft">
                <PackageCheck className="h-3.5 w-3.5" />
                Checkout
              </div>

              <h1 className="mt-4 font-display text-4xl font-semibold text-chocolate lg:text-5xl">
                Place Your Order
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-muted-foreground lg:text-base">
                Confirm your cake, add delivery details, and submit your order.
              </p>
            </div>

            <div className="hidden lg:grid h-28 w-28 place-items-center rounded-[2rem] bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/60 text-chocolate shadow-elevated">
              <Cake size={48} strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="glass h-fit rounded-3xl p-6">
            <h2 className="font-display text-3xl text-chocolate">
              Order Summary
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Your selected cake and calculated total.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-white/60 p-5 shadow-soft">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/50 text-chocolate">
                  <Cake className="h-5 w-5" />
                </div>

                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Cake
                </p>

                <h3 className="mt-2 font-display text-2xl text-chocolate">
                  {cakeName || "No cake selected"}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white/60 p-5 shadow-soft">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Unit Price
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-chocolate">
                    Rs. {unitPrice}
                  </h3>
                </div>

                <div className="rounded-3xl bg-white/60 p-5 shadow-soft">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Quantity
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-chocolate">
                    {quantity}
                  </h3>
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-[#fff0f4] to-[#fff8f1] p-5 shadow-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Total Price
                </p>
                <h3 className="mt-2 font-display text-4xl font-semibold text-chocolate">
                  Rs. {totalPrice}
                </h3>
              </div>
            </div>
          </section>

          <section className="glass rounded-3xl p-6 md:p-8">
            <div className="mb-6">
              <h2 className="font-display text-3xl text-chocolate">
                Billing & Delivery
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Add your details so the cake maker can prepare your order.
              </p>
            </div>

            {message && (
              <p className="mb-5 rounded-2xl bg-[#fff7f1] px-4 py-3 text-center text-sm text-[#8a5438]">
                {message}
              </p>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                  <Cake className="h-4 w-4" />
                  Cake Name
                </label>
                <Input
                  value={cakeName || "Select a cake from homepage"}
                  readOnly
                  className="bg-white/70"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                    <ShoppingBag className="h-4 w-4" />
                    Quantity
                  </label>
                  <Input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) =>
                      setQuantity(Math.max(1, Number(e.target.value)))
                    }
                    required
                    className="bg-white/70"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                    <CreditCard className="h-4 w-4" />
                    Total Price
                  </label>
                  <Input
                    value={`Rs. ${totalPrice}`}
                    readOnly
                    className="bg-white/70"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                  <UserRound className="h-4 w-4" />
                  Billing Name
                </label>
                <Input
                  type="text"
                  value={billingName}
                  onChange={(e) => setBillingName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="bg-white/70"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                <Input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  required
                  className="bg-white/70"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                  <MapPin className="h-4 w-4" />
                  Delivery Address
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter delivery address"
                  required
                  className="min-h-28 w-full rounded-md border border-input bg-white/70 px-3 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                  <CreditCard className="h-4 w-4" />
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-11 w-full rounded-md border border-input bg-white/70 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Card Payment">Card Payment</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#c7825a] py-6 text-base hover:bg-[#a96846]"
              >
                {loading ? "Submitting Order..." : "Submit Order"}
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;