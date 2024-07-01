const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderDetailRoutes = require("./routes/orderDetailRoutes");
const orderRoutes = require("./routes/orderRoutes");
const otpRoutes = require("./routes/otpRoutes")
require("dotenv").config();

const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orderDetail",orderDetailRoutes );
app.use("/api/order",orderRoutes );
app.use('/api/otp', otpRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

