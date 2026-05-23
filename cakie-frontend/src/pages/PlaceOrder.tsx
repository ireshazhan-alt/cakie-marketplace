import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/cakie/Navbar";
import { Footer } from "@/components/cakie/Footer";
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

  const totalPrice = unitPrice * quantity;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before placing an order");
      navigate("/login");
      return;
    }

    try {
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
        setMessage("Order placed successfully!");

        setTimeout(() => {
          navigate("/my-orders");
        }, 1000);
      } else {
        setMessage(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-xl mx-auto px-4 py-32">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border">
          <h1 className="text-3xl font-bold mb-6 text-center text-chocolate">
            Place Order
          </h1>

          {message && (
            <p className="mb-4 text-center font-medium text-chocolate">
              {message}
            </p>
          )}

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Cake Name</label>
              <Input value={cakeName} readOnly />
            </div>

            <div>
              <label className="block mb-1 font-medium">Unit Price</label>
              <Input value={`Rs. ${unitPrice}`} readOnly />
            </div>

            <div>
              <label className="block mb-1 font-medium">Quantity</label>
              <Input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Total Price</label>
              <Input value={`Rs. ${totalPrice}`} readOnly />
            </div>

            <div>
              <label className="block mb-1 font-medium">Billing Name</label>
              <Input
                type="text"
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <Input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Delivery Address</label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter delivery address"
                required
                className="w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Card Payment">Card Payment</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <Button type="submit" className="w-full">
              Submit Order
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlaceOrder;