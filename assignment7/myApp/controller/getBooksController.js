const Book=require('../db/schemas/bookSchema');

const getAllBooks=async(req,res)=>{
    try {
        const books = await Book.find();
        if (books.length) res.json(books);
        else res.send("No books found");
      } catch {
        res.status(500).send("Internal server err");
      }
}

const getBookById=async(req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findOne(
        { id },
        { _id: 0, id: 1, name: 1, author: 1 }
      );
      if (book) res.send(book);
      else res.send("No such book found");
    } catch {
      console.log(err);
      res.status(401).send("Bad request");
    }
  };

  const getAllBooksbyNameandAuthor=async(req,res)=>{
    
    const { name, author } = req.params;
    const decodedName = decodeURIComponent(name);
    const decodedAuthorname = decodeURIComponent(author);
    try {
      const book = await Book.findOne(
        { name: decodedName, author: decodedAuthorname },
        { _id: 0, id: 1, name: 1, author: 1 }
      );
      if (book) res.send(book);
      else res.send("No such book found");
    } catch {
      console.log(err);
      res.status(401).send("Bad request");
    }
  };

  const createNewBook=async (req, res) => {
    const { id, name, author } = req.body;
    try {
      const book = await Book.findOne({ id });
      if (book) res.send("Book already exists");
      else {
        const book = new Book({
          id,
          name,
          author,
        });
        book.save().then(() => {
          res.send("saved successfully");
        });
      }
    } catch {
      console.log(err);
      res.status(500).send("internal server err");
    }
  };

  const updateBookById=async (req, res) => {
    const bookId = req.params.id;
    const dataToBeUpdated = req.body;
    try {
      const result = await Book.findOneAndUpdate(
        { id: bookId },
        dataToBeUpdated,
        { new: true }
      );
   
      if (result) {
        res.send("Updated successfully");
      } else {
        res.send("No such book found");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server err");
    }
  }

  module.exports = {
    getAllBooks,
    getBookById,
    getAllBooksbyNameandAuthor,
    createNewBook,
    updateBookById,
  };