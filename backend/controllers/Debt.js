const Debt = require("../models/Debt");

// Add Debt
exports.addDebt = async (req, res) => {
  try {
    const { debtName, category, debtPaid, debtToPay, leftToSave } = req.body;

    const newDebt = await Debt.create({
      debtName,
      category,
      debtPaid,
      debtToPay,
      leftToSave,
    });

    res.status(200).json({
      success: true,
      message: "Debt added successfully",
      debt: newDebt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// Update Debt by ID
exports.updateDebt = async (req, res) => {
  try {
    const { debtName, category, debtPaid, debtToPay, leftToSave } = req.body;
    const debtId = req.params.id; // Assuming you pass the debt ID through the URL params

    const updatedDebt = await Debt.findByIdAndUpdate(
      debtId,
      { debtName, category, debtPaid, debtToPay, leftToSave },
      { new: true } // To return the updated document
    );

    if (!updatedDebt) {
      return res.status(404).json({
        success: false,
        message: "Debt not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Debt updated successfully",
      debt: updatedDebt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Debt by ID
exports.deleteDebt = async (req, res) => {
  try {
    const debtId = req.params.id;

    const deletedDebt = await Debt.findByIdAndDelete(debtId);

    if (!deletedDebt) {
      return res.status(404).json({
        success: false,
        message: "Debt not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Debt deleted successfully",
      debt: deletedDebt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Debts
exports.getAllDebts = async (req, res) => {
  try {
    const debts = await Debt.find();

    res.status(200).json({
      success: true,
      debts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
