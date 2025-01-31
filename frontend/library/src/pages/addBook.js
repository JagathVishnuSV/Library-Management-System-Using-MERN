import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', author: '', ISBN: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    try {
      await axios.post('/api/books', book, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      toast.success('Book added successfully!');
      navigate('/books');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add book.');
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          required
          style={styles.formInput}
        />
        <input
          type="text"
          placeholder="Author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          required
          style={styles.formInput}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={book.ISBN}
          onChange={(e) => setBook({ ...book, ISBN: e.target.value })}
          required
          style={styles.formInput}
        />
        <button type="submit" style={styles.formButton}>Add Book</button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: '400px', // Maximum width of the form
    margin: '0 auto', // Center the form
    padding: '20px', // Padding around the form
    backgroundColor: '#ffffff', // White background for the form
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
    textAlign: 'center', // Center text alignment
  },
  heading: {
    marginBottom: '20px', // Space below the heading
    color: '#333', // Dark color for the heading
  },
  formInput: {
    width: '100%', // Full width
    padding: '10px', // Padding inside input
    marginBottom: '15px', // Space below input
    border: '1px solid #ccc', // Border for input
    borderRadius: '4px', // Rounded corners
    fontSize: '16px', // Font size
  },
  formButton: {
    width: '100%', // Full width
    padding: '10px', // Padding inside button
    backgroundColor: '#dc3545', // Button color
    color: 'white', // White text
    border: 'none', // Remove border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.3s', // Transition for hover effect
  },
};

export default AddBook;