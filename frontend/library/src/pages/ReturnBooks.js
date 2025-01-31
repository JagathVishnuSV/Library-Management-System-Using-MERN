import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookList.css'; 

const ReturnBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get('/api/transactions/borrowed');
        setBorrowedBooks(response.data); 
      } catch (error) {
        toast.error('Failed to fetch borrowed books.');
      }
    };
    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (id) => {
    try {
      await axios.post(`/api/transactions/return`, { bookId: id });
      toast.success('Book returned successfully!');
      setBorrowedBooks(borrowedBooks.filter((book) => book._id !== id));
    } catch (error) {
      toast.error('Failed to return book.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Return Borrowed Books</h1>
      </header>

      <div className="book-list">
        {borrowedBooks.length > 0 ? (
          borrowedBooks.map((book) => (
            <div key={book._id} className="book-item">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.ISBN}</p>
              <div className="button-group">
                <button onClick={() => handleReturn(book._id)} className="return-button">Return</button>
              </div>
            </div>
          ))
        ) : (
          <p>You have no borrowed books.</p>
        )}
      </div>

      <footer>
        <p>Library Management System &copy; 2025</p>
      </footer>
    </div>
  );
};

export default ReturnBooks;
