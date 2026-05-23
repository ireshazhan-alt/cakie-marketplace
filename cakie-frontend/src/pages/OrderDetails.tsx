import { Button } from "@/components/ui/button";

const order = {
  id: "ORD001",
  cakeName: "Chocolate Dream Cake",
  customerName: "Nethmi Perera",
  sellerName: "Cake Bliss",
  quantity: 1,
  price: 4500,
  deliveryFee: 500,
  totalPrice: 5000,
  status: "Pending",
  paymentStatus: "Pending",
  orderDate: "2026-05-22",
  deliveryAddress: "Maharagama, Colombo",
};

const OrderDetails = () => {
  return (
    <div className="min-h-screen bg-[#fff7f1] px-4 py-28">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm text-gray-400">Order ID: {order.id}</p>
              <h1 className="text-3xl font-bold text-[#5c4033] mt-1">
                Order Details
              </h1>
            </div>

            <span className="px-4 py-2 rounded-full text-sm bg-[#f4dfd0] text-[#8a5438] w-fit">
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Cake Name</p>
              <h2 className="text-lg font-semibold text-[#5c4033]">
                {order.cakeName}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Customer Name</p>
              <h2 className="text-lg font-semibold text-[#5c4033]">
                {order.customerName}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Seller Name</p>
              <h2 className="text-lg font-semibold text-[#5c4033]">
                {order.sellerName}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Quantity</p>
              <h2 className="text-lg font-semibold text-[#5c4033]">
                {order.quantity}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <h2 className="text-lg font-semibold text-[#5c4033]">
                {order.orderDate}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <h2 className="text-lg font-semibold text-[#5c4033]">
                {order.paymentStatus}
              </h2>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Delivery Address</p>
              <h2 className="text-lg font-semibold text-[#5c4033]">
                {order.deliveryAddress}
              </h2>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Cake Price</span>
              <span>Rs. {order.price}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>Rs. {order.deliveryFee}</span>
            </div>

            <div className="flex justify-between text-xl font-bold text-[#5c4033] border-t pt-3">
              <span>Total</span>
              <span>Rs. {order.totalPrice}</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button variant="outline" className="rounded-full">
              Back
            </Button>

            <Button className="bg-[#c7825a] hover:bg-[#a96846] rounded-full">
              Cancel Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;