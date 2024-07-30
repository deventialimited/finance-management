const express = require("express");
const {
  addRevenue,
  getAllRevenues,
  deleteRevenue,
} = require("../controllers/Revenue");
const router = express.Router();

// Add Revenue route
router.post("/addRevenue", addRevenue);

// Get All Revenues route
router.get("/getAllRevenues", getAllRevenues);

// Delete a revenue by ID
router.delete("/deleteRevenue/:id", deleteRevenue);
module.exports = router;
