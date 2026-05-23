const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} = require("./controller");

const { protect } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/", protect, getAllOrders);
router.put("/:id/status", protect, updateOrderStatus);
router.get("/:id", protect, getOrderById);

module.exports = router;