import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', author: '', ISBN: '' });

  useEffect(() => {
    const fetchBook = async () => {
      const token = localStorage.getItem('token');  
      try {
        const response = await axios.get(`/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBook(response.data);
      } catch (error) {
        toast.error('Failed to fetch book details.');
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');  
    try {
      await axios.put(`/api/books/${id}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Book updated successfully!');
      navigate('/books');  
    } catch (error) {
      toast.error('Failed to update book.');
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Update Book</h2>
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
        <button type="submit" style={styles.formButton}>Update Book</button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: '400px', 
    margin: '0 auto', 
    padding: '20px', 
    backgroundColor: '#ffffff', 
    borderRadius: '8px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    textAlign: 'center', 
  },
  heading: {
    marginBottom: '20px', 
    color: '#333', 
  },
  formInput: {
    width: '100%', 
    padding: '10px',
    marginBottom: '15px', 
    border: '1px solid #ccc',
    borderRadius: '4px', 
    fontSize: '16px',
  },
  formButton: {
    width: '100%', 
    padding: '10px', 
    backgroundColor: '#dc3545', 
    color: 'white',
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s', 
  },
};

export default UpdateBook;