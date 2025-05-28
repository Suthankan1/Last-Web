import React, { useState } from "react";
import '../styles/SubCategory.css';
import Header from './Header';

const TopCategory = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const searchBooks = (e) => {
    setSearchTerm(e.target.value);
    // TODO: Implement search filtering logic
  };

  const filterBooks = (e) => {
    const { id, value } = e.target;
    if (id === "authorFilter") setAuthorFilter(value);
    else if (id === "languageFilter") setLanguageFilter(value);
    // TODO: Implement filter logic based on authorFilter and languageFilter states
  };

  return (
    <>
      <Header />

      <div className="search-container">
        <input
          type="text"
          id="searchBar"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={searchBooks}
        />
      </div>

      <h2>Explore Our TopCategory Categories</h2>

      <div className="filter-container" style={{ textAlign: "center", margin: "20px" }}>
        <select id="authorFilter" value={authorFilter} onChange={filterBooks}>
          <option value="">Filter by Author</option>
          <option value="Tsutomu Nihei">Tsutomu Nihei</option>
          <option value="Marjorie Liu">Marjorie Liu</option>
          <option value="Chris Claremont">Chris Claremont</option>
          {/* Add more author options if needed */}
        </select>

        <select id="languageFilter" value={languageFilter} onChange={filterBooks}>
          <option value="">Filter by Language</option>
          <option value="English">English</option>
          <option value="Japanese">Japanese</option>
          {/* Add more language options if needed */}
        </select>
      </div>

      {/* Add your rest of the JSX for carousel and book items here */}
      {/* Example of a carousel item */}
      <div className="category-section">
        <div className="category-title">Top Read Comics</div>
        <div className="carousel-container">
          <div className="carousel-item">
            <a href="#">
              <img src="/assets/book2.jpg" alt="Top Read Comic 2" />
            </a>
            <h3>Monstress</h3>
          </div>
          {/* Add more carousel items as needed */}
        </div>
      </div>
    </>
  );
};

export default TopCategory;
