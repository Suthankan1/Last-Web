import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/TopPicks.css';
import Header from './Header';
import Footer from './Footer';

const TopPicks = () => {
  const navigate = useNavigate();
  const [languageFilter, setLanguageFilter] = useState("");

  const books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", language: "English", image: "/assets/book1.jpg", reads: 920 },
    { id: 2, title: "1984", author: "George Orwell", language: "English", image: "/assets/book2.jpg", reads: 880 },
    { id: 3, title: "The Book Thief", author: "Markus Zusak", language: "German", image: "/assets/book3.jpg", reads: 650 },
    { id: 4, title: "Kafka on the Shore", author: "Haruki Murakami", language: "Japanese", image: "/assets/book4.jpg", reads: 450 },
    { id: 5, title: "Les Misérables", author: "Victor Hugo", language: "French", image: "/assets/book5.jpg", reads: 400 },
    { id: 6, title: "Pride and Prejudice", author: "Jane Austen", language: "English", image: "/assets/book6.jpg", reads: 500 },
    { id: 7, title: "Norwegian Wood", author: "Haruki Murakami", language: "Japanese", image: "/assets/book7.jpg", reads: 300 },
    { id: 8, title: "The Little Prince", author: "Antoine de Saint-Exupéry", language: "French", image: "/assets/book8.jpg", reads: 700 },
    { id: 9, title: "Crime and Punishment", author: "Fyodor Dostoevsky", language: "Russian", image: "/assets/book9.jpg", reads: 350 },
    { id: 10, title: "The Hobbit", author: "J.R.R. Tolkien", language: "English", image: "/assets/book10.jpg", reads: 800 }
  ];

  const filteredBooks = books
    .filter(book => languageFilter === "" || book.language === languageFilter)
    .sort((a, b) => b.reads - a.reads); // sort by most read

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <>
      <Header />
      <div className="top-picks-section">
        <h2>Top Picks</h2>

        <div className="filter-container">
          <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Japanese">Japanese</option>
            <option value="German">German</option>
            <option value="French">French</option>
            <option value="Russian">Russian</option>
          </select>
        </div>

        <div className="carousel-container">
          {filteredBooks.map((book) => (
            <div className="book-item" key={book.id} onClick={() => handleBookClick(book.id)}>
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TopPicks;
