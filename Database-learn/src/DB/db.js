const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
  
    );

    console.log("Connected to DB");
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
  }
}

module.exports = connectDB;
