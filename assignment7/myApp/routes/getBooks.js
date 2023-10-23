const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  getAllBooksbyNameandAuthor,
  createNewBook,
  updateBookById,
  deleteBook,
} = require("../controller/getBooksController");
const authorization = require("../middleware/authentication");

router.get("/", authorization, getAllBooks);

router.get("/:name/:author", authorization, getAllBooksbyNameandAuthor);

router.get("/:id", authorization, getBookById);

router.post("/createbook", authorization, createNewBook);

router.put("/update/:id", authorization, updateBookById);

router.delete("/delete/:id", authorization, deleteBook);

module.exports = router;
