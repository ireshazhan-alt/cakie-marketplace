import { Button } from "@/components/ui/button";

const orders = [
  {
    id: "ORD001",
    cakeName: "Chocolate Dream Cake",
    quantity: 1,
    totalPrice: 4500,
    status: "Pending",
    date: "2026-05-22",
  },
  {
    id: "ORD002",
    cakeName: "Vanilla Rose Cake",
    quantity: 2,
    totalPrice: 7000,
    status: "Preparing",
    date: "2026-05-20",
  },
  {
    id: "ORD003",
    cakeName: "Red Velvet Cake",
    quantity: 1,
    totalPrice: 5200,
    status: "Delivered",
    date: "2026-05-15",
  },
];

const MyOrders = () => {
  return (
    <div className="min-h-screen bg-[#fff7f1] px-4 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#5c4033]">My Orders</h1>
          <p className="text-gray-500 mt-2">
            View and track your cake orders.
          </p>
        </div>

        <div className="grid gap-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <p className="text-sm text-gray-400">Order ID: {order.id}</p>
                <h2 className="text-xl font-semibold text-[#5c4033] mt-1">
                  {order.cakeName}
                </h2>
                <p className="text-gray-500 mt-1">
                  Quantity: {order.quantity} | Date: {order.date}
                </p>
              </div>

              <div className="flex flex-col md:items-end gap-3">
                <p className="text-lg font-bold text-[#5c4033]">
                  Rs. {order.totalPrice}
                </p>

                <span className="px-4 py-1 rounded-full text-sm bg-[#f4dfd0] text-[#8a5438]">
                  {order.status}
                </span>

                <Button className="bg-[#c7825a] hover:bg-[#a96846] rounded-full">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;