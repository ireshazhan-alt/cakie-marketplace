const express = require("express");
const {
  getAllCakes,
  getCakeById,
  getMyCakes,
  addCake,
  updateCake,
  deleteCake,
} = require("./controller");

const { protect, adminOrSeller } = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllCakes);                               // public — homepage uses this
router.get("/my-cakes", protect, adminOrSeller, getMyCakes); // seller sees their own cakes
router.get("/:id", getCakeById);                           // public — cake details page
router.post("/", protect, adminOrSeller, addCake);         // seller adds a cake
router.put("/:id", protect, adminOrSeller, updateCake);    // seller edits a cake
router.delete("/:id", protect, adminOrSeller, deleteCake); // seller deletes a cake

module.exports = router;