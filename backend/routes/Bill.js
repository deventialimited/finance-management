const express = require("express");
const { addBill, getAllBills } = require("../controllers/Bill");
const router = express.Router();

// Add Bill route
router.post("/addBill", addBill);

// Get All Bills route
router.get("/getAllBills", getAllBills);

module.exports = router;
