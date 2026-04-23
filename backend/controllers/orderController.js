const Order = require("../models/Order");

exports.createOrder = async (req, resp) => {
  try {

    const {
              customerName,
              email,
              phone,
              address,
              orderItems,
              totalAmount,
                  } = req.body

    const order = new Order({
      customerName,
      email,
      phone,
      address,
      orderItems,
      totalAmount,
    })

    const savedOrder = await order.save()

    resp.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    })

  } catch (error) {
    resp.status(500).json({ message: error.message })
  }
}

//get all orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("customerName email")
    .sort({ createdAt: -1 });

  res.json(orders);
}


// Admin - Update order status
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = req.body.status;

  if (req.body.status === "Delivered") {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.json({ message: "Order status updated" });
};

// Delete order
exports.deleteOrder = async (req, resp) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    resp.json({ message: "Product deleted successfully" })
  } catch (error) {
    resp.status(500).json({ message: error.message })
  }
}