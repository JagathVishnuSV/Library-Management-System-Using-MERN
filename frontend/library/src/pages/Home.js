import React from 'react';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="content-box">
        <h1>Welcome to the Library Management System</h1>
        <p>
          Our library offers a vast collection of books across various genres. 
          Whether you are looking for fiction, non-fiction, academic resources, 
          or the latest bestsellers, we have something for everyone.
        </p>
        <p>
          Join us in exploring the world of literature. You can borrow books, 
          participate in reading programs, and enjoy a quiet space to study and 
          read. Our dedicated staff is here to assist you in finding the perfect 
          book or resource.
        </p>
        <p>
          Don't forget to check out our events page for upcoming book readings, 
          author signings, and community events. We look forward to seeing you at 
          the library!
        </p>
      </div>
    </div>
  );
};

export default Home;