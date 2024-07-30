const mongoose = require("mongoose");

// Define Saving schema
const SavingSchema = new mongoose.Schema({
  savingName: { type: String, required: true },
  category: { type: String, required: true },
  accumulatedAmount: { type: Number, required: true },
  annualVariation: { type: Number, required: true },
  annualByType: { type: String, required: true },
  monthlyVariation: { type: Number, required: true },
  monthlyByType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Saving = mongoose.model("Saving", SavingSchema);

module.exports = Saving;
