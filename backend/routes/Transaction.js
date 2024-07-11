const express = require("express");
const {
  addTransaction,
  getAllTransactions,
} = require("../controllers/Transaction");
const router = express.Router();

// Add Transaction route
router.post("/addTransaction", addTransaction);

// Get All Transactions route
router.get("/getAllTransactions", getAllTransactions);

module.exports = router;
