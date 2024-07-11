const mongoose = require("mongoose");

// Define Transaction schema
const TransactionSchema = new mongoose.Schema({
  transactionName: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionDate: { type: Date, required: true }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
