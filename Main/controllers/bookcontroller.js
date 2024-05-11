const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author", "name").exec();
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor.");
  }
};

exports.createBook = async (req, res) => {
  const { title, author, genre, publicationDate, publisher } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      publicationDate,
      publisher,
    });
    await newBook.save();
    res.status(201).json({ message: "Libro creado correctamente." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor.");
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }
    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor.");
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publicationDate, publisher } = req.body;

  try {
    let book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.publicationDate = publicationDate;
    book.publisher = publisher;

    await book.save();
    res.json({ message: "Libro actualizado correctamente." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor.");
  }
};

exports.softDeleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    let book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    book.disabled = true;
    await book.save();
    res.json({ message: "Libro deshabilitado correctamente." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor.");
  }
};
