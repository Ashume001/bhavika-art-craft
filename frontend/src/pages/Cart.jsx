import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const FREE_SHIPPING_LIMIT = 500;
const SHIPPING_CHARGE = 99;

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // ✅ SAFE SUBTOTAL
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.price || item.sizes?.[0]?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  const shipping =
    subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_CHARGE;

  const total = subtotal - discount + shipping;

  // ================= EMPTY CART =================
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">
          🛒 Your Cart is Empty
        </h2>
        <Link
          to="/"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAEDED] py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE - CART ITEMS */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">

          <h2 className="text-2xl font-bold mb-6">
            Shopping Cart
          </h2>

          {cartItems.map((item) => {
            const price =
              item.price || item.sizes?.[0]?.price || 0;

            return (
              <div
                key={item.cartId}
                className="flex gap-6 border-b py-6"
              >
                {/* IMAGE */}
                <img
                  src={`https://bhavikaartandcraft.com${item.images?.[0]}`}
                  alt={item.name}
                  className="w-32 h-32 object-cover"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  {/* SIZE */}
                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize?.label}
                  </p>

                  {/* PRICE */}
                  <p className="text-lg font-bold mt-1">
                    ₹ {price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        dispatch(
                          decrementQuantity(
                            item.cartId
                          )
                        )
                      }
                      className="border px-3 py-1"
                    >
                      −
                    </button>

                    {item.quantity}

                    <button
                      onClick={() =>
                        dispatch(
                          incrementQuantity(
                            item.cartId
                          )
                        )
                      }
                      className="border px-3 py-1"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      dispatch(
                        removeFromCart(
                          item.cartId
                        )
                      )
                    }
                    className="text-red-500 text-sm mt-2"
                  >
                    Delete
                  </button>
                </div>

                {/* RIGHT SIDE PRICE */}
                <div className="font-bold text-lg">
                  ₹ {price * item.quantity}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="bg-white p-6 rounded shadow h-fit">

          <h3 className="text-xl font-semibold mb-4">
            Order Summary
          </h3>

          {/* FREE SHIPPING */}
          {shipping === 0 ? (
            <p className="text-green-600 mb-3">
              ✔ Free Delivery
            </p>
          ) : (
            <p className="text-gray-500 mb-3">
              Add ₹ {FREE_SHIPPING_LIMIT - subtotal} more
              for FREE delivery
            </p>
          )}

          {/* COUPON */}
          <div className="flex gap-2 mb-4">
            <input
              value={couponCode}
              onChange={(e) =>
                setCouponCode(e.target.value)
              }
              placeholder="Coupon Code"
              className="border px-3 py-2 w-full"
            />
            <button
              onClick={() => setDiscount(100)}
              className="bg-black text-white px-4"
            >
              Apply
            </button>
          </div>

          {/* PRICE DETAILS */}
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? "FREE" : `₹ ${shipping}`}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹ {discount}</span>
              </div>
            )}
          </div>

          <hr className="my-4" />

          {/* TOTAL */}
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>

          {/* CHECKOUT */}
          <Link
            to="/checkout"
              state={{
               subtotal,
               discount,
               shipping,
               total,
              }}
            className="block mt-6 bg-yellow-400 text-black text-center py-3 rounded font-semibold hover:bg-yellow-500"
          >
            Proceed to Buy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;