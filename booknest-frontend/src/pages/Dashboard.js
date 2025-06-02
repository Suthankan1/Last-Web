import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component

function Dashboard() {
  const [userName, setUserName] = useState('Thuvarahan.T'); // Default name

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name || 'User');
    }
  }, []);

  return (
    <div className="page-container">
      <Header />
      <div className="container py-5 dashboard-container">
        <div className="d-flex align-items-center mb-4 animate__animated animate__fadeInLeft">
          <img src="/profile pic.jpeg" alt="Profile" className="profile-pic me-4" />
          <div>
            <h3 className="mb-1">
              Hello, <span id="userName">{userName}</span>
            </h3>
            <button className="btn btn-sm btn-outline-warning">Edit Profile</button>
          </div>
        </div>

        <h4 className="section-title">🛒 Your Cart</h4>
        <div className="horizontal-scroll-container">
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg" className="card-img-top" alt="Book 1" />
              <div className="card-body">
                <h6 className="card-title">The Mindful Reader</h6>
                <button className="btn btn-sm btn-danger">Remove</button>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/71UwSHSZRnS.jpg" className="card-img-top" alt="Book 2" />
              <div className="card-body">
                <h6 className="card-title">Power of Now</h6>
                <button className="btn btn-sm btn-danger">Remove</button>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/71g2ednj0JL.jpg" className="card-img-top" alt="Book 3" />
              <div className="card-body">
                <h6 className="card-title">Can't Hurt Me</h6>
                <button className="btn btn-sm btn-danger">Remove</button>
              </div>
            </div>
          </div>
          {/* Add more cart items here */}
        </div>

        <h4 className="section-title">📖 Last Read</h4>
        <div className="horizontal-scroll-container">
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/91bYsX41DVL.jpg" className="card-img-top" alt="Last Read" />
              <div className="card-body">
                <h6 className="card-title">Atomic Habits</h6>
                <button className="btn btn-sm btn-custom">Continue Reading</button>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/81-QB7nDh4L.jpg" className="card-img-top" alt="Last Read 2" />
              <div className="card-body">
                <h6 className="card-title">Think and Grow Rich</h6>
                <button className="btn btn-sm btn-custom">Continue Reading</button>
              </div>
            </div>
          </div>
          {/* Add more last read items here */}
        </div>

        <h4 className="section-title">❤️ Favorites</h4>
        <div className="horizontal-scroll-container">
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg" className="card-img-top" alt="Favorite" />
              <div className="card-body">
                <h6 className="card-title">The Alchemist</h6>
                <button className="btn btn-sm btn-outline-danger">Remove</button>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/61Iz2yy2CKL.jpg" className="card-img-top" alt="Favorite 2" />
              <div className="card-body">
                <h6 className="card-title">Educated</h6>
                <button className="btn btn-sm btn-outline-danger">Remove</button>
              </div>
            </div>
          </div>
          {/* Add more favorite items here */}
        </div>

        <h4 className="section-title">📚 Purchased Books</h4>
        <div className="horizontal-scroll-container">
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg" className="card-img-top" alt="Purchased" />
              <div className="card-body">
                <h6 className="card-title">Rich Dad Poor Dad</h6>
                <button className="btn btn-sm btn-success">Read Now</button>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/71g2ednj0JL.jpg" className="card-img-top" alt="Purchased 2" />
              <div className="card-body">
                <h6 className="card-title">Can't Hurt Me</h6>
                <button className="btn btn-sm btn-success">Read Now</button>
              </div>
            </div>
          </div>
          {/* Add more purchased items here */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;