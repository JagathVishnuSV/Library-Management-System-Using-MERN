const express = require('express');
const { getBooks, addBook, updateBook, deleteBook,getBook } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/:id', getBook);
router.get('/', getBooks);
router.post('/', authMiddleware, addBook);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;