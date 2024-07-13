const express = require("express");
const {
  addSaving,
  getAllSavings,
  updateSaving,
  deleteSaving,
} = require("../controllers/Saving");
const router = express.Router();

// Add a new saving
router.post("/addSaving", addSaving);

// Get all savings
router.get("/getAllSavings", getAllSavings);

// Update a saving by ID
router.put("/updateSaving/:id", updateSaving);

// Delete a saving by ID
router.delete("/deleteSaving/:id", deleteSaving);
module.exports = router;
