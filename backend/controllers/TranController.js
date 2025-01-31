const Book = require('../models/Book');
const Transaction = require('../models/Transaction');

const borrowBook = async (req, res) => {
  const { bookId } = req.body; 
  const userId = req.user.id;  

  try {
    const book = await Book.findById(bookId); 
    if (!book) {
      return res.status(404).json({ message: 'Book not found' }); 
    }

    if (!book.available) {
      return res.status(400).json({ message: 'Book is not available' }); 
    }

    book.available = false;
    await book.save();

    const transaction = new Transaction({
      userId,
      bookId,
      borrowedDate: new Date(),
    });

    await transaction.save(); 
    res.status(201).json({ transaction }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' }); 
  }
};


const returnBook = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.returnedDate) {
      return res.status(400).json({ message: 'Book already returned' });
    }

    transaction.returnedDate = new Date();
    await transaction.save();

    const book = await Book.findById(transaction.bookId);
    book.available = true;
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTransactions = async (req, res) => {
  const userId = req.user.id; 

  try {
    const transactions = await Transaction.find({ userId }).populate('bookId');
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { borrowBook, returnBook, getTransactions };
