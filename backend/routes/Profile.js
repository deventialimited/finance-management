const express = require("express");
const {
  getProfileById,
  addProfile,
  updateProfile,
} = require("../controllers/Profile");
const router = express.Router();

// Get profile by ID
router.get("/getProfileById/:id", getProfileById);

// Add a new profile
router.post("/addProfile", addProfile);

// Update a profile by ID
router.put("/updateProfile/:id", updateProfile);

module.exports = router;
