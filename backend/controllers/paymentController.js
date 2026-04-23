const Razorpay = require('razorpay')
const crypto = require('crypto')
const Order = require('../models/Order')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { orderData } = req.body;

    // 1 Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: orderData.totalAmount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    // 2 Save Order in DB (Pending)
    const newOrder = await Order.create({
      ...orderData,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "Pending",
      status: "Pending",
    });

    res.json({
      razorpayOrderId: razorpayOrder.id,
      orderId: newOrder._id,
      amount: razorpayOrder.amount,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 🔹 VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

   // UPDATE existing order
    const updatedOrder = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: "Paid",
        status: "Processing",
      },
      { new: true }
    );

    res.json({ success: true, order: updatedOrder });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};