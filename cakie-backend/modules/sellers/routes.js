const express = require("express");
const {
  getMySellerProfile,
  getSellerById,
  createSellerProfile,
  updateSellerProfile,
  getAllSellers,
} = require("./controller");

const { protect, adminOrSeller, adminOnly } = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly, getAllSellers);          // admin sees all sellers
router.get("/me", protect, adminOrSeller, getMySellerProfile); // seller sees own profile
router.get("/:id", getSellerById);                          // public — seller profile page
router.post("/", protect, createSellerProfile);             // any logged-in user creates seller profile
router.put("/me", protect, adminOrSeller, updateSellerProfile); // seller updates own profile

module.exports = router;