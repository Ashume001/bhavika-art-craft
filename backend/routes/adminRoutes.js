const express = require("express")
const router = express.Router()
const { loginAdmin,  createAdmin, getDashboardStats,  } = require("../controllers/adminController")
const { protectAdmin } = require("../middleware/adminMiddleware")

// router.post("/register" , createAdmin)
router.post("/login", loginAdmin)

router.get("/dashboard", protectAdmin , getDashboardStats)

module.exports = router
