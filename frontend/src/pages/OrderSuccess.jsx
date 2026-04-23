import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Order Found</h2>
        <Link to="/shop" className="text-blue-500 underline">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
        🎉 Order Placed Successfully!
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Payment ID:</strong>{order.razorpayPaymentId}</p>
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Status:</strong> {order.status}</p>

        <hr />

        <h3 className="text-xl font-semibold">Items:</h3>
        {order.orderItems.map((item) => (
          <div key={item.productId} className="flex justify-between">
            <span>{item.name} (x{item.quantity})</span>
            <span>₹ {item.price * item.quantity}</span>
          </div>
        ))}

        <hr />

        <p className="text-lg font-bold">
          Total: ₹ {order.totalAmount}
        </p>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/shop"
          className="bg-rose-500 text-white px-6 py-3 rounded-full"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;