const fs = require("fs");
const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const path = require("path");

//@description     Add a new book
//@route           POST /api/book/add
//@access          author

const addBook = asyncHandler(async (req, res) => {
  const { title, description, publishedDate, authorId } = req.body;
  const bookFile = req.file;
  if (bookFile) {
    const book = await Book.create({
      title,
      description,
      publishedDate,
      authorId,
      book: {
        filename: bookFile.filename,
        originalName: bookFile.originalname,
        path: bookFile.path,
        size: bookFile.size,
      },
    });

    if (book) {
      res.status(201).json({ message: "Book Uploaded!", book });
    } else {
      res.status(401);
      next(new Error("Book is not uploaded!"));
    }
  }
});

//@description     Get all Books
//@route           POST /api/book/getBooks
//@access          public

const getBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find();
  if (books) {
    res.status(200).json(books);
  } else {
    res.status(401);
    next(new Error("Books are not retreived!"));
  }
});

//@description     Get a new book
//@route           GET /api/book/:filename
//@access          author, admin

const readBook = (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/books/${filename}`;
  const stat = fs.statSync(filePath);

  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=${filename}`);

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
};

//@description     Edit's a particular Book
//@route           Patch /api/book/editBook/:bookId
//@access          author, admin

const editBook = asyncHandler(async (req, res) => {
  const bookId = req.params.bookId;
  const { title, description, publishedDate } = req.body;

  const book = await Book.findByIdAndUpdate(
    bookId,
    {
      title,
      description,
      publishedDate,
    },
    { new: true }
  );
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(401);
    next(new Error("Book not updated!"));
  }
});

//@description     Delete a Books
//@route           Delete /api/book/deleteBook/:bookId
//@access          author, admin

const deleteBook = asyncHandler(async (req, res) => {
  const bookId = req.params.bookId;
  const response = await Book.findByIdAndDelete(bookId);
  const filePath = path.join(
    __basedir,
    `uploads/books/${response.book.filename}`
  );

  if (response) {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not delete the file. " + err,
        });
      }

      res.status(200).send({
        message: "File is deleted from directory.",
      });
    });
  } else {
    res.status(401);
    next(new Error("Book not deleted from mongoose!"));
  }
});

module.exports = { addBook, readBook, getBooks, editBook, deleteBook };
