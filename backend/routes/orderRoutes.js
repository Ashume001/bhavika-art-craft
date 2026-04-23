const express = require("express")
const router = express.Router()
const { createOrder, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController")
const { protectAdmin } = require("../middleware/adminMiddleware")
const Order = require('../models/Order')


router.post("/", createOrder)

//admin protected
router.get('/' , protectAdmin , getAllOrders)
router.put('/:id' , protectAdmin , updateOrderStatus)

router.delete('/:id' , protectAdmin , deleteOrder)

//for cod option
router.post("/create-cod-order", async (req, res) => {
  const order = await Order.create({
    ...req.body,
    paymentMethod: "cod",
    paymentStatus: "Pending",
    status: "Processing",
  });

  res.json({ order });
});

module.exports = router
