const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./modules/users/routes");
const orderRoutes = require("./modules/orders/routes");
const cakeRoutes = require("./modules/cakes/routes");      // ← add this
const sellerRoutes = require("./modules/sellers/routes");  // ← add this

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cakes", cakeRoutes);      // ← add this
app.use("/api/sellers", sellerRoutes);  // ← add this

app.get("/", (req, res) => {
  res.send("Cakie backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});