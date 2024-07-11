const Bill = require("../models/Bill");

// Add Bill
exports.addBill = async (req, res) => {
  try {
    const { billName, billType, amount, dueDate } = req.body;

    const newBill = await Bill.create({
      billName,
      billType,
      amount,
      dueDate,
    });

    res.status(200).json({
      success: true,
      message: "Bill added successfully",
      bill: newBill,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();

    res.status(200).json({
      success: true,
      bills,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
