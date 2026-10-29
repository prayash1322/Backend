const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://prayash22:KmQVzA24p9Lh8PZN@my-backend.1d0cj7h.mongodb.net/halley",
    );

    console.log("Connected to DB");
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
  }
}

module.exports = connectDB;
