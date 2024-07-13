const mongoose = require("mongoose");

// Define Expense schema
const ExpenseSchema = new mongoose.Schema({
  expenseName: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  expenseDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;
