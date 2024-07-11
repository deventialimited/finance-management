const mongoose = require("mongoose");

// Define Payment schema
const PaymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true }
});

// Define Debt schema
const DebtSchema = new mongoose.Schema({
  debtName: { type: String, required: true },
  category: { type: String, required: true },
  payments: [PaymentSchema]
});

const Debt = mongoose.model("Debt", DebtSchema);

module.exports = Debt;
