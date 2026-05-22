import { Button } from "@/components/ui/button";

const sellerOrders = [
  {
    id: "ORD001",
    customerName: "Nethmi Perera",
    cakeName: "Chocolate Dream Cake",
    quantity: 1,
    totalPrice: 4500,
    status: "Pending",
    deliveryAddress: "Maharagama, Colombo",
  },
  {
    id: "ORD002",
    customerName: "Kavindi Silva",
    cakeName: "Vanilla Rose Cake",
    quantity: 2,
    totalPrice: 7000,
    status: "Accepted",
    deliveryAddress: "Nugegoda, Colombo",
  },
  {
    id: "ORD003",
    customerName: "Ayesha Fernando",
    cakeName: "Red Velvet Cake",
    quantity: 1,
    totalPrice: 5200,
    status: "Preparing",
    deliveryAddress: "Kottawa, Colombo",
  },
];

const ManageOrders = () => {
  return (
    <div className="min-h-screen bg-[#fff7f1] px-4 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#5c4033]">
            Manage Orders
          </h1>
          <p className="text-gray-500 mt-2">
            View, accept, reject, and update customer orders.
          </p>
        </div>

        <div className="grid gap-5">
          {sellerOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div>
                  <p className="text-sm text-gray-400">
                    Order ID: {order.id}
                  </p>

                  <h2 className="text-xl font-semibold text-[#5c4033] mt-1">
                    {order.cakeName}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Customer: {order.customerName}
                  </p>

                  <p className="text-gray-500">
                    Quantity: {order.quantity}
                  </p>

                  <p className="text-gray-500">
                    Delivery: {order.deliveryAddress}
                  </p>
                </div>

                <div className="flex flex-col lg:items-end gap-3">
                  <p className="text-lg font-bold text-[#5c4033]">
                    Rs. {order.totalPrice}
                  </p>

                  <span className="px-4 py-1 rounded-full text-sm bg-[#f4dfd0] text-[#8a5438]">
                    {order.status}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    <Button className="bg-green-600 hover:bg-green-700 rounded-full">
                      Accept
                    </Button>

                    <Button className="bg-red-500 hover:bg-red-600 rounded-full">
                      Reject
                    </Button>

                    <Button className="bg-[#c7825a] hover:bg-[#a96846] rounded-full">
                      Mark Delivered
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;