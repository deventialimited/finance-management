const express = require("express");
const { addExpense, getAllExpenses } = require("../controllers/Expense");
const router = express.Router();

// Add Expense route
router.post("/addExpense", addExpense);

// Get All Expenses route
router.get("/getAllExpenses", getAllExpenses);

module.exports = router;
