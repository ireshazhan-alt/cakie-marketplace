const Seller = require("./model");

const getMySellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id }).populate(
      "user",
      "name email phone"
    );

    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    res.status(200).json({ seller });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get seller profile",
      error: error.message,
    });
  }
};

const getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({ seller });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get seller",
      error: error.message,
    });
  }
};

const createSellerProfile = async (req, res) => {
  try {
    const existing = await Seller.findOne({ user: req.user._id });

    if (existing) {
      return res.status(400).json({ message: "Seller profile already exists" });
    }

    const { shopName, bio, location, phone } = req.body;

    const seller = await Seller.create({
      user: req.user._id,
      shopName,
      bio,
      location,
      phone,
    });

    res.status(201).json({
      message: "Seller profile created successfully",
      seller,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create seller profile",
      error: error.message,
    });
  }
};

const updateSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });

    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    const { shopName, bio, location, phone } = req.body;

    seller.shopName = shopName || seller.shopName;
    seller.bio = bio || seller.bio;
    seller.location = location || seller.location;
    seller.phone = phone || seller.phone;

    const updatedSeller = await seller.save();

    res.status(200).json({
      message: "Seller profile updated successfully",
      seller: updatedSeller,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update seller profile",
      error: error.message,
    });
  }
};

const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().populate("user", "name email");

    res.status(200).json({ sellers });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get sellers",
      error: error.message,
    });
  }
};

module.exports = {
  getMySellerProfile,
  getSellerById,
  createSellerProfile,
  updateSellerProfile,
  getAllSellers,
};