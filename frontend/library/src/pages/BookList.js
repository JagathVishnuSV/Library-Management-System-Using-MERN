import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        toast.error('Failed to fetch books.');
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
      toast.success('Book deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete book.');
    }
  };

  const handleBorrow = async (id) => {
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      toast.error('You must be logged in to borrow a book.');
      navigate('/login'); 
      return;
    }
  
    try {
      const response = await axios.post(
        `/api/transactions/borrow`,
        { bookId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log(response.data);
  
      toast.success('Book borrowed successfully!');
    } catch (error) {
      toast.error('Failed to borrow book.');
    }
  };
  
  

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Welcome to the Library Management System</h1>
      </header>

      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book._id} className="book-item">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.ISBN}</p>
            <div className="button-group">
              <button onClick={() => navigate(`/update-book/${book._id}`)} className="edit-button">Edit</button>
              {/* Delete button */}
              <button onClick={() => handleDelete(book._id)} className="delete-button">Delete</button>
              {/* Borrow button */}
              <button onClick={() => handleBorrow(book._id)} className="borrow-button">Borrow</button>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p>Library Management System &copy; 2025</p>
      </footer>
    </div>
  );
};

export default BookList;
