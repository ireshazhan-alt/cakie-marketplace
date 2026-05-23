import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/cakie/Navbar";
import { Footer } from "@/components/cakie/Footer";
import { Button } from "@/components/ui/button";

type Order = {
  _id: string;
  cakeName: string;
  quantity: number;
  totalPrice: number;
  deliveryAddress: string;
  billingName?: string;
  phoneNumber?: string;
  paymentMethod?: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  customerId?: {
    name?: string;
    email?: string;
    phone?: string;
  };
};

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setOrder(data);
        } else {
          setMessage(data.message || "Failed to fetch order details");
        }
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="px-4 py-32 text-center">
          <p className="text-muted-foreground">Loading order details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (message || !order) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="px-4 py-32 text-center">
          <p className="text-red-500">{message || "Order not found"}</p>
          <Button className="mt-4" onClick={() => navigate("/my-orders")}>
            Back to My Orders
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-32">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-3xl border p-8">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Order Details
              </p>
              <h1 className="font-display text-4xl text-chocolate mt-2">
                {order.cakeName}
              </h1>
            </div>

            <span className="rounded-full bg-secondary px-4 py-2 text-sm text-chocolate">
              {order.orderStatus}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border p-5">
              <h2 className="font-semibold text-chocolate mb-4">
                Cake Information
              </h2>

              <p className="mb-2">
                <span className="font-medium">Cake:</span> {order.cakeName}
              </p>
              <p className="mb-2">
                <span className="font-medium">Quantity:</span> {order.quantity}
              </p>
              <p className="mb-2">
                <span className="font-medium">Total Price:</span> Rs.{" "}
                {order.totalPrice}
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <h2 className="font-semibold text-chocolate mb-4">
                Customer Information
              </h2>

              <p className="mb-2">
                <span className="font-medium">Billing Name:</span>{" "}
                {order.billingName || order.customerId?.name || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-medium">Phone:</span>{" "}
                {order.phoneNumber || order.customerId?.phone || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-medium">Email:</span>{" "}
                {order.customerId?.email || "N/A"}
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <h2 className="font-semibold text-chocolate mb-4">
                Delivery Information
              </h2>

              <p className="mb-2">
                <span className="font-medium">Address:</span>{" "}
                {order.deliveryAddress}
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <h2 className="font-semibold text-chocolate mb-4">
                Payment Information
              </h2>

              <p className="mb-2">
                <span className="font-medium">Payment Method:</span>{" "}
                {order.paymentMethod || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-medium">Payment Status:</span>{" "}
                {order.paymentStatus}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/my-orders")}
              className="rounded-full"
            >
              Back to My Orders
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetails;