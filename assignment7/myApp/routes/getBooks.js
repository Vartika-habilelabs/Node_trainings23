const express=require('express')
const router=express.Router();
const {
    getAllBooks,
    getBookById,
    getAllBooksbyNameandAuthor,
    createNewBook,
    updateBookById,
  } = require('../controller/getBooksController');


router.get("/", getAllBooks);

router.get("/:name/:author",getAllBooksbyNameandAuthor)
router.get("/:id",getBookById)

router.post("/",createNewBook)

router.put("/:id",updateBookById)

module.exports = router; 