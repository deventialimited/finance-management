const mongoose = require("mongoose");

// Define Revenue schema
const RevenueSchema = new mongoose.Schema({
  revenueName: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  revenueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Revenue = mongoose.model("Revenue", RevenueSchema);
module.exports = Revenue;
