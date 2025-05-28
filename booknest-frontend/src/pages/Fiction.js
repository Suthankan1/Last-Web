import React, { useState } from "react";
import '../styles/SubCategory.css';
import Header from './Header';
import Footer from './Footer';

const Fiction = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const books = [
    {
      title: "Monstress",
      author: "Marjorie Liu",
      language: "English",
      image: "/assets/book2.jpg"
    },
    {
      title: "Blame!",
      author: "Tsutomu Nihei",
      language: "Japanese",
      image: "/assets/book1.jpg"
    },
    {
      title: "X-Men",
      author: "Chris Claremont",
      language: "English",
      image: "/assets/book3.jpg"
    },
    // Add more books as needed
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    const { id, value } = e.target;
    if (id === "authorFilter") setAuthorFilter(value);
    if (id === "languageFilter") setLanguageFilter(value);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthor = authorFilter === "" || book.author === authorFilter;
    const matchesLanguage = languageFilter === "" || book.language === languageFilter;
    return matchesSearch && matchesAuthor && matchesLanguage;
  });

  return (
    <>
      <Header />

      <div className="search-container">
        <input
          type="text"
          id="searchBar"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <h2>Explore Our Fiction Categories</h2>

      <div className="filter-container">
        <select id="authorFilter" value={authorFilter} onChange={handleFilter}>
          <option value="">Filter by Author</option>
          <option value="Tsutomu Nihei">Tsutomu Nihei</option>
          <option value="Marjorie Liu">Marjorie Liu</option>
          <option value="Chris Claremont">Chris Claremont</option>
        </select>

        <select id="languageFilter" value={languageFilter} onChange={handleFilter}>
          <option value="">Filter by Language</option>
          <option value="English">English</option>
          <option value="Japanese">Japanese</option>
        </select>
      </div>

      <div className="category-section">
        <div className="category-title">Top Read Comics</div>
        <div className="carousel-container">
          {books.slice(0, 5).map((book, index) => (
            <div className="carousel-item" key={index}>
              <a href="#">
                <img src={book.image} alt={book.title} />
              </a>
              <h3>{book.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="category-section">
        <div className="category-title">All Children’s Comics</div>
        <div className="books-grid">
          {filteredBooks.map((book, index) => (
            <div className="book-item" key={index}>
              <img src={book.image} alt={book.title} />
              <h3 style={{ textAlign: "center", padding: "10px" }}>{book.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Fiction;
