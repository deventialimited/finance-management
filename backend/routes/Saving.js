const express = require("express");
const { addSaving, getAllSavings } = require("../controllers/Saving");
const router = express.Router();

// Add a new saving
router.post("/addSaving", addSaving);

// Get all savings
router.get("/getAllSavings", getAllSavings);

module.exports = router;
