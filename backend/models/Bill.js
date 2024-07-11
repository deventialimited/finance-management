const mongoose = require("mongoose");

// Define Bill schema
const BillSchema = new mongoose.Schema({
  billName: { type: String, required: true },
  billType: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true }
});

const Bill = mongoose.model("Bill", BillSchema);
module.exports = Bill;
