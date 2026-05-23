const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updateUserBlockStatus,
} = require("./controller");

const { protect, adminOnly } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/", protect, adminOnly, getAllUsers);
router.put("/:id/block", protect, adminOnly, updateUserBlockStatus);

module.exports = router;