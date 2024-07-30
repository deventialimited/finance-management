const Saving = require("../models/Saving");

// Add Saving
exports.addSaving = async (req, res) => {
  try {
    const {
      savingName,
      category,
      accumulatedAmount,
      annualByType,
      monthlyByType,
      annualVariation,
      monthlyVariation,
    } = req.body;

    const newSaving = await Saving.create({
      savingName,
      category,
      accumulatedAmount,
      annualByType,
      monthlyByType,
      annualVariation,
      monthlyVariation,
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

// Update Saving by ID
exports.updateSaving = async (req, res) => {
  try {
    const {
      savingName,
      category,
      accumulatedAmount,
      annualByType,
      monthlyByType,
      annualVariation,
      monthlyVariation,
    } = req.body;
    const savingId = req.params.id; // Assuming you pass the saving ID through the URL params

    const updatedSaving = await Saving.findByIdAndUpdate(
      savingId,
      {
        savingName,
        category,
        accumulatedAmount,
        annualByType,
        monthlyByType,
        annualVariation,
        monthlyVariation,
      },
      { new: true } // To return the updated document
    );

    if (!updatedSaving) {
      return res.status(404).json({
        success: false,
        message: "Saving not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Saving updated successfully",
      saving: updatedSaving,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Saving by ID
exports.deleteSaving = async (req, res) => {
  try {
    const savingId = req.params.id;

    const deletedSaving = await Saving.findByIdAndDelete(savingId);

    if (!deletedSaving) {
      return res.status(404).json({
        success: false,
        message: "Saving not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Saving deleted successfully",
      saving: deletedSaving,
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
