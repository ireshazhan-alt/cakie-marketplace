const Cake = require("./model");

const getAllCakes = async (req, res) => {
  try {
    const cakes = await Cake.find({ isAvailable: true })
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ cakes });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get cakes",
      error: error.message,
    });
  }
};

const getCakeById = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!cake) {
      return res.status(404).json({ message: "Cake not found" });
    }

    res.status(200).json({ cake });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get cake",
      error: error.message,
    });
  }
};

const getMyCakes = async (req, res) => {
  try {
    const cakes = await Cake.find({ seller: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ cakes });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get your cakes",
      error: error.message,
    });
  }
};

const addCake = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const cake = await Cake.create({
      name,
      description,
      price,
      category,
      image,
      seller: req.user._id,
    });

    res.status(201).json({
      message: "Cake added successfully",
      cake,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add cake",
      error: error.message,
    });
  }
};

const updateCake = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);

    if (!cake) {
      return res.status(404).json({ message: "Cake not found" });
    }

    // make sure the logged-in seller owns this cake
    if (cake.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this cake" });
    }

    const { name, description, price, category, image, isAvailable } = req.body;

    cake.name = name || cake.name;
    cake.description = description || cake.description;
    cake.price = price || cake.price;
    cake.category = category || cake.category;
    cake.image = image || cake.image;
    if (isAvailable !== undefined) cake.isAvailable = isAvailable;

    const updatedCake = await cake.save();

    res.status(200).json({
      message: "Cake updated successfully",
      cake: updatedCake,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update cake",
      error: error.message,
    });
  }
};

const deleteCake = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);

    if (!cake) {
      return res.status(404).json({ message: "Cake not found" });
    }

    // make sure the logged-in seller owns this cake
    if (cake.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this cake" });
    }

    await cake.deleteOne();

    res.status(200).json({ message: "Cake deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete cake",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCakes,
  getCakeById,
  getMyCakes,
  addCake,
  updateCake,
  deleteCake,
};