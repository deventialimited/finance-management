const mongoose = require("mongoose");

// Define Profile schema
const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String }, // Add image field
  createdAt: { type: Date, default: Date.now },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
