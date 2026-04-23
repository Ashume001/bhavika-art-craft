const User = require("../models/admin")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Order = require('../models/Order')
const Product = require('../models/products')

// Login
exports.loginAdmin = async (req, resp) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return resp.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return resp.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    resp.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
};

// //  Register secret one time creation
// exports.createAdmin = async (req, resp) => {
//   try {
//     const { email, password } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return resp.status(400).json({ message: "Admin already exists" });
//     }

//     const admin = await User.create({ email, password });

//     resp.status(201).json({
//       message: "Admin created successfully",
//       admin: {
//         id: admin._id,
//         email: admin.email
//       }
//     });

//   } catch (error) {
//     resp.status(500).json({ message: error.message });
//   }
// };


// admin dashboard analytics
exports.getDashboardStats = async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments();

  const revenueData = await Order.aggregate([
    { $match: { isPaid: true } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.json({
    totalProducts,
    totalOrders,
    totalUsers,
    totalRevenue: revenueData[0]?.totalRevenue || 0,
  });
};
