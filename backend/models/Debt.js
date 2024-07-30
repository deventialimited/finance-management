const mongoose = require("mongoose");
// Define Debt schema
const DebtSchema = new mongoose.Schema({
  debtName: { type: String, required: true },
  category: { type: String, required: true },
  debtPaid: { type: String, required: true },
  debtToPay: { type: String, required: true },
  leftToSave: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Debt = mongoose.model("Debt", DebtSchema);

module.exports = Debt;
