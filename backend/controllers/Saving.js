const Saving = require("../models/Saving");

// Add Saving
exports.addSaving = async (req, res) => {
  try {
    const { category, accumulatedAmount, annualVariation, monthlyVariation } = req.body;

    const newSaving = await Saving.create({
      category,
      accumulatedAmount,
      annualVariation,
      monthlyVariation
    });

    res.status(200).json({
      success: true,
      message: "Saving added successfully",
      saving: newSaving,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Savings
exports.getAllSavings = async (req, res) => {
  try {
    const savings = await Saving.find();

    res.status(200).json({
      success: true,
      savings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
