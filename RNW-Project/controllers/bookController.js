const Book = require("../models/Book");

const getBooks = async (req, res) => {
  const { genre, author, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (genre) filter.genre = genre;
  if (author) filter.author = author;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const total = await Book.countDocuments(filter);
  const books = await Book.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ total, page: Number(page), pages: Math.ceil(total / limit), books });
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

const addBook = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.coverImage = `/uploads/${req.file.filename}`;
  const book = await Book.create(data);
  res.status(201).json(book);
};

const updateBook = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.coverImage = `/uploads/${req.file.filename}`;
  const book = await Book.findByIdAndUpdate(req.params.id, data, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json({ message: "Book deleted successfully" });
};

const buyBook = async (req, res) => {
  const quantity = Number(req.body.quantity) || 1;

  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  if (book.stock < quantity) return res.status(400).json({ message: "Not enough copies in stock" });

  book.stock -= quantity;
  await book.save();

  const total = quantity * book.price;
  res.json({ message: `You bought ${quantity} copy(ies) of ${book.title} for ₹${total}`, total, book });
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook, buyBook };
