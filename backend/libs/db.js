const mongoose = require("mongoose");

const databaseUrl = "mongodb+srv://codewithkazmi:codewithkazmi@cluster0.73ptvm2.mongodb.net/";

module.exports = async () => {
    try {
      const connectionParams = {
        socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
        connectTimeoutMS: 10000, // Increase connection timeout to 10 seconds
        retryWrites: true, // Enable retryable writes
      };
      await mongoose.connect(databaseUrl, connectionParams);
      console.log(`database is successfully connected`);
    } catch (error) {
      console.log("there are errors in mongoDB connection", error);
    }
  };
