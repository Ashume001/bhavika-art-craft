import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ SAFE PRICE CALCULATION (FIXED)
  const calcSubtotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const {
    subtotal = calcSubtotal,
    discount = 0,
    shipping = calcSubtotal > 500 ? 0 : 99,
    total = calcSubtotal - discount + shipping,
  } = location.state || {};

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.customerName || !form.email || !form.phone || !form.address) {
      alert("Please fill all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    const orderData = {
      ...form,

      orderItems: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price || 0,
        quantity: item.quantity || 1,
        size: item.selectedSize?.label,
      })),

      subtotal,
      discount,
      shipping,
      totalAmount: total,
      paymentMethod,
    };

    try {
      // ✅ COD
      if (paymentMethod === "cod") {
        const { data } = await api.post(
          "/orders/create-cod-order",
          orderData
        );

        dispatch(clearCart());

        navigate("/order-success", {
          state: { order: data.order },
        });

        return;
      }

      // ✅ ONLINE PAYMENT
      const { data } = await api.post("/payment/create-order", {
        orderData,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        order_id: data.razorpayOrderId,

        prefill: {
          name: form.customerName,
          email: form.email,
          contact: form.phone,
        },

        theme: {
          color: "#facc15",
        },

        handler: async function (response) {
          const verifyRes = await api.post(
            "/payment/verify-payment",
            {
              ...response,
              orderData,
            }
          );

          dispatch(clearCart());

          navigate("/order-success", {
            state: { order: verifyRes.data.order },
          });
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="md:col-span-2 space-y-6">

          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              1. Delivery Address
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="customerName"
                placeholder="Full Name"
                onChange={handleChange}
                className="border p-3 rounded"
              />
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                className="border p-3 rounded"
              />
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="border p-3 rounded md:col-span-2"
              />
              <textarea
                name="address"
                placeholder="Full Address"
                onChange={handleChange}
                className="border p-3 rounded md:col-span-2"
              />
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              2. Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex gap-2">
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Pay Online (UPI / Card)
              </label>

              <label className="flex gap-2">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          {/* CART ITEMS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              3. Review Items
            </h2>

            {cartItems.map((item) => (
              <div
                key={item.cartId || item._id}
                className="flex gap-4 border-b py-4"
              >
                <img
                  src={`https://bhavikaartandcraft.com${item.images?.[0]}`}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>

                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize?.label || "N/A"}
                  </p>

                  <p className="text-sm">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹ {(item.price || 0) * (item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-10">

          <h2 className="text-lg font-semibold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600 mb-2">
              <span>Discount</span>
              <span>- ₹ {discount}</span>
            </div>
          )}

          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹ ${shipping}`}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold"
          >
            {loading ? "Processing..." : `Place Order ₹ ${total}`}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Checkout;