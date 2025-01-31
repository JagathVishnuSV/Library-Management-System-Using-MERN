const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  borrowedDate: { type: Date, default: Date.now },
  returnedDate: { type: Date, default: null },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
