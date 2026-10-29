const express = require("express");
const upload = require("../middleware/upload");
const { validateId, validateListQuery, validateNewBook, validateBookUpdate, validateBuy } = require("../middleware/validate");
const { getBooks, getBookById, addBook, updateBook, deleteBook, buyBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/books", validateListQuery, getBooks);
router.get("/books/:id", validateId, getBookById);
router.post("/addbook", upload.single("coverImage"), validateNewBook, addBook);
router.put("/books/:id", upload.single("coverImage"), validateId, validateNewBook, updateBook);
router.patch("/books/:id", upload.single("coverImage"), validateBookUpdate, updateBook);
router.delete("/books/:id", validateId, deleteBook);
router.post("/books/:id/buy", validateBuy, buyBook);

module.exports = router;
