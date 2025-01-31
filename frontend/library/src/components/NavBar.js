import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId) {
      navigate(`/books/${searchId}`);  
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navItems}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/books" style={styles.link}>Books</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/add-book" style={styles.link}>Add Book</Link>

        <Link to="/transactions" style={styles.link}>Borrow Books</Link>

        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>Search</button>
        </form>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: '#000', // Black background
    padding: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    margin: '0 15px',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s',
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  searchInput: {
    padding: '5px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  searchButton: {
    color: 'white',
    backgroundColor: '#dc3545', // Red button
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Navbar;
