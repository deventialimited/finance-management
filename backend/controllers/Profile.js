const multer = require("multer");
const { uploadSingle } = require("../middlewares/multer");
const Profile = require("../models/Profile");
const fs = require("fs");
const path = require("path");

// Get Profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profileId = req.params.id;
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Add Profile
exports.addProfile = async (req, res) => {
  try {
    uploadSingle.single("image")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log(err);
        return res.status(400).json({ message: err.message, success: false });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err);
        return res.status(500).json({ message: err.message, success: false });
      }

      const { firstName, lastName, email, address, city, state, password } =
        req.body;
      const image = req.file ? req.file.filename : null;

      const newProfile = await Profile.create({
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        password,
        image,
      });

      res.status(200).json({
        success: true,
        message: "Profile added successfully",
        profile: newProfile,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Profile by ID
exports.updateProfile = async (req, res) => {
  try {
    uploadSingle.single("image")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log(err);
        return res.status(400).json({ message: err.message, success: false });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err);
        return res.status(500).json({ message: err.message, success: false });
      }

      const { firstName, lastName, email, address, city, state, password } =
        req.body;
      const profileId = req.params.id;
      const image = req.file ? req.file.filename : null;

      const profile = await Profile.findById(profileId);
      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found",
        });
      }

      if (image && profile.image) {
        const previousImagePath = path.join(
          __dirname,
          "../uploads/",
          profile.image
        );
        fs.unlink(previousImagePath, (err) => {
          if (err) console.log("Error deleting previous image:", err);
        });
      }

      const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
        {
          firstName,
          lastName,
          email,
          address,
          city,
          state,
          password,
          image: image || profile.image,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
