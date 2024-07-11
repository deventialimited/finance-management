const mongoose = require("mongoose");

// Define Expense schema
const ExpenseSchema = new mongoose.Schema({
  expenseName: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  expenseDate: { type: Date, required: true }
});

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;
