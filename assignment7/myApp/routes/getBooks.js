const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  getAllBooksbyNameandAuthor,
  createNewBook,
  updateBookById,
} = require("../controller/getBooksController");
const authorization = require("../middleware/authentication");

router.get("/", authorization, getAllBooks);

router.get("/:name/:author", authorization, getAllBooksbyNameandAuthor);

router.get("/:id", authorization, getBookById);

router.post("/", authorization, createNewBook);

router.put("/:id", authorization, updateBookById);

module.exports = router;
