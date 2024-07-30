const express = require("express");
const { addExpense, getAllExpenses, deleteExpense } = require("../controllers/Expense");
const router = express.Router();

// Add Expense route
router.post("/addExpense", addExpense);

// Get All Expenses route
router.get("/getAllExpenses", getAllExpenses);

// Delete a expense by ID
router.delete("/deleteExpense/:id", deleteExpense);
module.exports = router;
