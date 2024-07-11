const express = require("express");
const { addDebt, getAllDebts } = require("../controllers/Debt");
const router = express.Router();

// Add a new debt
router.post("/addDebt", addDebt);

// Get all debts
router.get("/getAllDebts", getAllDebts);

module.exports = router;
