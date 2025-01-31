import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/addBook';
import UpdateBook from './pages/UpdateBook';
import BookTransaction from './pages/BookTransactions';
import NotFound from './pages/NotFound';
import './index.css';

const isAuthenticated = () => localStorage.getItem('token') !== null;

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />

        <Route path="/add-book" element={<ProtectedRoute element={<AddBook />} />} />
        <Route path="/update-book/:id" element={<ProtectedRoute element={<UpdateBook />} />} />

        <Route path="/transactions" element={<ProtectedRoute element={<BookTransaction />} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
