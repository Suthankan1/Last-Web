import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import Header from './Header';
import Footer from './Footer';

const DEFAULT_PROFILE =
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // Default boy avatar image

function Dashboard() {
  const [userName, setUserName] = useState('Thuvarahan.T');
  const [profilePic, setProfilePic] = useState(DEFAULT_PROFILE);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name || 'User');
      setProfilePic(parsedUser.profilePic || DEFAULT_PROFILE);
    }
  }, []);

  return (
    <div className="netflix-dashboard-bg">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-profile">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <div>
            <h3>
              Hello, <span className="dashboard-username">{userName}</span>
            </h3>
            <button className="netflix-btn-outline">Edit Profile</button>
          </div>
        </div>

        <h4 className="dashboard-section-title">🛒 Your Cart</h4>
        <div className="horizontal-scroll-container">
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg" className="card-img-top" alt="Book 1" />
              <div className="card-body">
                <h6 className="card-title">The Mindful Reader</h6>
                <button className="netflix-btn-danger">Remove</button>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/71UwSHSZRnS.jpg" className="card-img-top" alt="Book 2" />
              <div className="card-body">
                <h6 className="card-title">Power of Now</h6>
                <button className="netflix-btn-danger">Remove</button>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/71g2ednj0JL.jpg" className="card-img-top" alt="Book 3" />
              <div className="card-body">
                <h6 className="card-title">Can't Hurt Me</h6>
                <button className="netflix-btn-danger">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <h4 className="dashboard-section-title">📖 Last Read</h4>
        <div className="horizontal-scroll-container">
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/91bYsX41DVL.jpg" className="card-img-top" alt="Atomic Habits" />
              <div className="card-body">
                <h6 className="card-title">Atomic Habits</h6>
                <button className="netflix-btn-primary">Continue Reading</button>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/81-QB7nDh4L.jpg" className="card-img-top" alt="Think and Grow Rich" />
              <div className="card-body">
                <h6 className="card-title">Think and Grow Rich</h6>
                <button className="netflix-btn-primary">Continue Reading</button>
              </div>
            </div>
          </div>
        </div>

        <h4 className="dashboard-section-title">❤️ Favorites</h4>
        <div className="horizontal-scroll-container">
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg" className="card-img-top" alt="The Alchemist" />
              <div className="card-body">
                <h6 className="card-title">The Alchemist</h6>
                <button className="netflix-btn-outline-danger">Remove</button>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/61Iz2yy2CKL.jpg" className="card-img-top" alt="Educated" />
              <div className="card-body">
                <h6 className="card-title">Educated</h6>
                <button className="netflix-btn-outline-danger">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <h4 className="dashboard-section-title">📚 Purchased Books</h4>
        <div className="horizontal-scroll-container">
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg" className="card-img-top" alt="Rich Dad Poor Dad" />
              <div className="card-body">
                <h6 className="card-title">Rich Dad Poor Dad</h6>
                <button className="netflix-btn-success">Read Now</button>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="card text-center">
              <img src="https://m.media-amazon.com/images/I/71g2ednj0JL.jpg" className="card-img-top" alt="Can't Hurt Me" />
              <div className="card-body">
                <h6 className="card-title">Can't Hurt Me</h6>
                <button className="netflix-btn-success">Read Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;