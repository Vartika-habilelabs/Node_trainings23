import express from "express";
import connectDB from "./db/connect.js";
import Book from "./db/schema.js";
const app = express();

app.use(express.json());
connectDB()
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api/v1/book", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length) res.json(books);
    else res.send("No books found");
  } catch {
    res.status(500).send("Internal server err");
  }
});

app.get("/api/v1/book/:name/:author", async (req, res) => {
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
});

app.get("/api/v1/book/:id", async (req, res) => {
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
});

app.post("/api/v1/book", async (req, res) => {
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
});

app.put("/api/v1/book/:id", async (req, res) => {
  const bookId = req.params.id;
  const dataToBeUpdated = req.body;
  try {
    const result = await Book.findOneAndUpdate(
      { id: bookId },
      dataToBeUpdated,
      { new: true }
    );
    console.log("result:-" + result);
    if (result) {
      res.send("Updated successfully");
    } else {
      res.send("No such book found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server err");
  }
});

app.listen(3000, (err) => {
  console.log("server is running on port 3000");
});
