import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password, role: 'student' });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.formInput}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.formInput}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.formInput}
        />
        <button type="submit" style={styles.formButton}>Register</button>
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

export default Register;