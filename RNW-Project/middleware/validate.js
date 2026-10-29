const fs = require("fs");
const { body, param, query, validationResult } = require("express-validator");

const checkErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) fs.unlink(req.file.path, () => {});
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const validateId = [param("id").isMongoId().withMessage("Invalid book id"), checkErrors];

const validateListQuery = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a number greater than 0"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
  query("minPrice").optional().isFloat({ min: 0 }).withMessage("Minimum price must be a positive number"),
  query("maxPrice").optional().isFloat({ min: 0 }).withMessage("Maximum price must be a positive number"),
  checkErrors,
];

const validateNewBook = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("isbn").trim().notEmpty().withMessage("ISBN is required").bail().isISBN().withMessage("ISBN is not valid"),
  body("genre").optional().trim().notEmpty().withMessage("Genre cannot be empty"),
  body("description").optional().trim().isLength({ max: 1000 }).withMessage("Description can be at most 1000 characters"),
  body("price").notEmpty().withMessage("Price is required").bail().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a whole number, 0 or more"),
  checkErrors,
];

const validateBookUpdate = [
  param("id").isMongoId().withMessage("Invalid book id"),
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
  body("author").optional().trim().notEmpty().withMessage("Author cannot be empty"),
  body("isbn").optional().trim().isISBN().withMessage("ISBN is not valid"),
  body("genre").optional().trim().notEmpty().withMessage("Genre cannot be empty"),
  body("description").optional().trim().isLength({ max: 1000 }).withMessage("Description can be at most 1000 characters"),
  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a whole number, 0 or more"),
  checkErrors,
];

const validateBuy = [
  param("id").isMongoId().withMessage("Invalid book id"),
  body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be a whole number, at least 1"),
  checkErrors,
];

module.exports = { validateId, validateListQuery, validateNewBook, validateBookUpdate, validateBuy };
