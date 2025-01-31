import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        toast.error('Failed to fetch books.');
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(books.filter((book) => book._id !== id));  // Remove the deleted book from the list
        toast.success('Book deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete book.');
      }
    }
  };

  return (
    <div className="books-list-container">
      <h2>Books List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
