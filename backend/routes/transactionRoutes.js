const express = require('express');
const router = express.Router();
const { borrowBook, returnBook, getTransactions } = require('../controllers/TranController');
const  authMiddleware  = require('../middleware/authMiddleware');

router.post('/borrow', authMiddleware, borrowBook);
router.put('/return/:id', authMiddleware, returnBook);
router.get('/', authMiddleware, getTransactions);

module.exports = router;
