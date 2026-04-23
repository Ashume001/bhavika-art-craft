const express = require('express')
const cors = require('cors')
const productRoute = require('./routes/productRoute')
const adminRoute = require('./routes/adminRoutes')
const orderRoutes = require('./routes/orderRoutes')
const coupanRoutes = require('./routes/couponRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())

//upload
app.use("/uploads", express.static("uploads"))


//routes
app.use('/api/products' , productRoute)
app.use('/api/admin' , adminRoute)
app.use('/api/orders' , orderRoutes)
app.use('/api/coupon' ,  coupanRoutes)
app.use('/api/payment', paymentRoutes)

const frontendPath = path.join(__dirname, "frontend", "dist");

// static files
app.use(express.static(frontendPath));

// test route (IMPORTANT)
app.get("/test", (req, res) => {
  res.send("Server Working Fine");
});

// fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});


// app.get('/' , (req , resp) => {
//     resp.send('Bhavika Art & Craft API Running')
// })

module.exports = app 