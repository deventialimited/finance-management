const Revenue = require("../models/Revenue");

// Add Revenue
exports.addRevenue = async (req, res) => {
  try {
    const { revenueName, category, amount, revenueDate } = req.body;

    const newRevenue = await Revenue.create({
      revenueName,
      category,
      amount,
      revenueDate,
    });

    res.status(200).json({
      success: true,
      message: "Revenue added successfully",
      revenue: newRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Revenues
exports.getAllRevenues = async (req, res) => {
  try {
    const revenues = await Revenue.find();

    res.status(200).json({
      success: true,
      revenues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Revenue by ID
exports.deleteRevenue = async (req, res) => {
  try {
    const revenueId = req.params.id;

    const deletedRevenue = await Revenue.findByIdAndDelete(revenueId);

    if (!deletedRevenue) {
      return res.status(404).json({
        success: false,
        message: "Revenue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Revenue deleted successfully",
      revenue: deletedRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
