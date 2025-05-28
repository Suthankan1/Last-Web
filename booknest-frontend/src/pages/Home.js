// Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ← Added
import '../styles/Home.css';
import Header from './Header';
import Footer from './Footer';

function Home() {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <>
      <Header />

      {/* rest of your content remains unchanged */}

      <div className="hero">
        <div className="hero-content">
          <h2>Your Story Starts Here</h2>
          <p>Discover gripping tales and timeless classics handpicked for readers like you.</p>
          <div className="browse-container">
            <button onClick={toggleSearch} className="browse-button">Browse Now</button>
            <input
              type="text"
              className={`search-input ${searchVisible ? 'show' : 'hidden'}`}
              placeholder="Search books..."
            />
          </div>
        </div>
      </div>

      <div className="carousel-section">
        <h2>New Releases</h2>
        <div className="carousel">
          {/* Add book cards here */}
          <BookCard image="/assets/Toletthem.jpg" title="The Let Them Theory" />
          <BookCard image="/assets/bible.webp" title="Atomic Habits" />
          <BookCard image="/assets/bigdump.webp" title="The Silent Patient" />
          <BookCard image="/assets/Great.jpg" title="The Silent Patient" />
          <BookCard image="/assets/ilovemom.webp" title="The Silent Patient" />
          <BookCard image="/assets/kitchen.webp" title="The Silent Patient" />
          {/* ...add more as needed */}
        </div>
      </div>

      <div className="carousel-section">
        <h2>Trending Now</h2>
        <div className="carousel">
          <BookCard image="/assets/Great.jpg" title="The Silent Patient" />
          <BookCard image="/assets/ilovemom.webp" title="The Silent Patient" />
          <BookCard image="/assets/kitchen.webp" title="The Silent Patient" />
          <BookCard image="/assets/Toletthem.jpg" title="The Let Them Theory" />
          <BookCard image="/assets/bible.webp" title="Atomic Habits" />
          <BookCard image="/assets/bigdump.webp" title="The Silent Patient" />
          {/* ...add more as needed */}
        </div>
      </div>

      <Footer />
    </>
  );
}

const BookCard = ({ image, title }) => (
  <div className="card">
    <img src={image} alt={title} />
    <h3>{title}</h3>
  </div>
);

export default Home;