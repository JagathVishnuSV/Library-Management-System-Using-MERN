import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({ book }) => {
  return (
    <div>
      <h3>
        <Link to={`/books/${book._id}`}>{book.title}</Link>
      </h3>
      <p>Author: {book.author}</p>
      <p>Status: {book.available ? 'Available' : 'Borrowed'}</p>
    </div>
  );
};

export default BookItem;