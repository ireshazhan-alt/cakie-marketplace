const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updateUserBlockStatus,
} = require("./controller");

const { protect } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/", protect, getAllUsers);

// block / unblock user
router.put("/:id/block", protect, updateUserBlockStatus);

module.exports = router;