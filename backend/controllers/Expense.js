const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { expenseName, category, amount, expenseDate } = req.body;

    const newExpense = await Expense.create({
      expenseName,
      category,
      amount,
      expenseDate,
    });

    res.status(200).json({
      success: true,
      message: "Expense added successfully",
      expense: newExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const ExpenseId = req.params.id;

    const deletedExpense = await Expense.findByIdAndDelete(ExpenseId);

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      expense: deletedExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
