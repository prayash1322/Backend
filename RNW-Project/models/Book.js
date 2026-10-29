const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: { type: String, required: [true, "Author is required"], trim: true },
    isbn: { type: String, required: [true, "ISBN is required"], unique: true, trim: true },
    genre: { type: String, trim: true, default: "General" },
    description: { type: String, trim: true },
    price: { type: Number, required: [true, "Price is required"], min: [0, "Price cannot be negative"] },
    stock: { type: Number, default: 0, min: [0, "Stock cannot be negative"] },
    coverImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
