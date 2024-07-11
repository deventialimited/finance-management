const mongoose = require("mongoose");

// Define Saving schema
const SavingSchema = new mongoose.Schema({
  category: { type: String, required: true },
  accumulatedAmount: { type: Number, required: true },
  annualVariation: { type: Number, required: true },
  monthlyVariation: { type: Number, required: true }
});

const Saving = mongoose.model("Saving", SavingSchema);

module.exports = Saving;
