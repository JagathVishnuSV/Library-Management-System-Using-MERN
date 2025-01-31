import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookTransaction = ({ userId }) => {
  const [books, setBooks] = useState([]);
  const [selectedBookToBorrow, setSelectedBookToBorrow] = useState('');
  const [loadingBooks, setLoadingBooks] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        toast.error('Error fetching books');
      } finally {
        setLoadingBooks(false);
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = async () => {
    if (!selectedBookToBorrow) {
      toast.error('Please select a book');
      return;
    }

    const requestData = { bookId: selectedBookToBorrow };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/transactions/borrow',
        requestData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Book borrowed successfully!');
      setSelectedBookToBorrow('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error borrowing book');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Book Transactions</h2>

      {/* Borrow Section */}
      <div style={styles.section}>
        <h3>Borrow a Book</h3>
        {loadingBooks ? (
          <p>Loading books...</p>
        ) : (
          <div style={styles.borrowContainer}>
            <select
              value={selectedBookToBorrow}
              onChange={(e) => setSelectedBookToBorrow(e.target.value)}
              style={styles.select}
            >
              <option value="">Select a book</option>
              {books.map(book => (
                <option key={book._id} value={book._id}>{book.title}</option>
              ))}
            </select>
            <button onClick={handleBorrow} style={styles.button}>Borrow</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Full height of the viewport
    padding: '20px',
    backgroundColor: '#f8f9fa', // Light background color
  },
  section: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white', // White background for the section
    width: '300px', // Fixed width for the section
    textAlign: 'center', // Center text
  },
  borrowContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
  },
  select: {
    padding: '8px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    flex: '1', // Allow the select to grow
  },
  button: {
    padding: '8px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default BookTransaction;