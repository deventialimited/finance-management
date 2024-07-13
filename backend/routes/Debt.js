const express = require("express");
const { addDebt, getAllDebts, updateDebt, deleteDebt } = require("../controllers/Debt");
const router = express.Router();

// Add a new debt
router.post("/addDebt", addDebt);

// Get all debts
router.get("/getAllDebts", getAllDebts);

// Update a debt by ID
router.put("/updateDebt/:id", updateDebt);

// Delete a debt by ID 
router.delete("/deleteDebt/:id", deleteDebt);
module.exports = router;
