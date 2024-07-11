const Debt = require("../models/Debt");

// Add Debt
exports.addDebt = async (req, res) => {
  try {
    const { debtName, category, payments } = req.body;

    const newDebt = await Debt.create({
      debtName,
      category,
      payments
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
