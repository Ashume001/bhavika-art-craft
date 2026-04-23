const Coupon = require('../models/coupons')

exports.validateCoupon = async (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon || !coupon.isActive) {
      return res.status(400).json({ message: "Invalid Coupon Code" });
    }

    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: "Coupon Expired" });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ message: "Coupon Usage Limit Reached" });
    }

    if (totalAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order amount ₹${coupon.minOrderAmount} required`,
      });
    }

    let discountAmount = 0;

    if (coupon.discountType === "percentage") {
      discountAmount = (totalAmount * coupon.discountValue) / 100;
    } else {
      discountAmount = coupon.discountValue;
    }

    return res.json({
      success: true,
      discountAmount,
      finalAmount: totalAmount - discountAmount,
      message: "Coupon Applied Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}