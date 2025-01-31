const Book = require('../models/Book');

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id); 
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);  
  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
};

const addBook = async (req, res) => {
  const { title, author, ISBN } = req.body;
  const book = new Book({ title, author, ISBN });
  try {
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getBooks,getBook, addBook, updateBook, deleteBook };