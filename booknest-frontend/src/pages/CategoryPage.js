import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Category.css";

function getPriceRange(books) {
  if (!books.length) return [0, 0];
  let min = books[0].priceNum;
  let max = books[0].priceNum;
  for (const b of books) {
    if (b.priceNum < min) min = b.priceNum;
    if (b.priceNum > max) max = b.priceNum;
  }
  return [Math.floor(min), Math.ceil(max)];
}

export default function CategoryPage({ category }) {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState("all");
  const [language, setLanguage] = useState("all");
  const [price, setPrice] = useState(0);
  const [modalBook, setModalBook] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axios.get(`/api/books/category/${category}`);

        const booksWithPriceNum = res.data.map(b => ({
          ...b,
          priceNum: typeof b.price === "number"
            ? b.price
            : Number(String(b.price).replace(/[^0-9.-]+/g, "")) || 0
        }));

        setBooks(booksWithPriceNum);

        const [min, max] = getPriceRange(booksWithPriceNum);
        setPrice(max);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    }
    fetchBooks();
  }, [category]);

  const authorOptions = useMemo(
    () => ["all", ...Array.from(new Set(books.map(b => b.author || "Unknown")))],
    [books]
  );

  const languageOptions = useMemo(
    () => ["all", ...Array.from(new Set(books.map(b => b.language || "Unknown")))],
    [books]
  );

  const [minPrice, maxPrice] = useMemo(() => getPriceRange(books), [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(
      b =>
        (author === "all" || b.author === author) &&
        (language === "all" || b.language === language) &&
        b.priceNum <= price
    );
  }, [books, author, language, price]);

  function handleFilterChange(setter) {
    return e => {
      setIsFading(true);
      setTimeout(() => {
        setter(e.target.value);
        setIsFading(false);
      }, 210);
    };
  }

  function openModal(book) {
    setModalBook(book);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setModalOpen(false);
    setTimeout(() => setModalBook(null), 440);
    document.body.style.overflow = "";
  }

  useEffect(() => {
    if (!isModalOpen) return;
    const handler = e => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleAddToCart(book) {
    alert(`Added "${book.title}" to cart!`);
  }

  return (
    <>
      <Header />
      <div className="category-container">
        <h1 className="stylish-title">
          <span className="title-accent">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>{" "}
          Books
        </h1>

        {/* Filters */}
        <section className="filter-section">
          <div className="filter-group">
            <label htmlFor="filter-author">Author</label>
            <select id="filter-author" value={author} onChange={handleFilterChange(setAuthor)}>
              {authorOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt === "all" ? "All Authors" : opt}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-language">Language</label>
            <select id="filter-language" value={language} onChange={handleFilterChange(setLanguage)}>
              {languageOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt === "all" ? "All Languages" : opt}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-price">Price up to</label>
            <input
              type="range"
              id="filter-price"
              min={minPrice}
              max={maxPrice}
              step="0.01"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
            />
            <div className="price-range-values">
              <span>${minPrice.toFixed(2)}</span>
              <span>${price.toFixed(2)}</span>
              <span>${maxPrice.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Book Grid */}
        <main>
          <div className={`book-grid${isFading ? " fade-exit" : ""}`}>
            {filteredBooks.map((book, idx) => (
              <div
                key={book._id || `${book.title}-${idx}`}
                className="book-card"
                style={{ animationDelay: `${0.045 * idx + 0.09}s` }}
              >
                <div className="book-image-box">
                  <img src={book.image || "/default-book.png"} alt={`${book.title} cover`} />
                </div>
                <div className="book-card-content">
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}</div>
                  <div className="book-price">${book.priceNum.toFixed(2)}</div>
                  <div className="card-btn-group">
                    <button className="btn secondary btn-view-details" onClick={() => openModal(book)}>
                      View Details
                    </button>
                    <button className="btn btn-add-cart" onClick={() => handleAddToCart(book)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal Backdrop */}
      <div
        className={`modal-blur-bg${isModalOpen ? " active" : ""}`}
        onClick={closeModal}
        style={{ cursor: isModalOpen ? "pointer" : "default" }}
        aria-hidden={!isModalOpen}
      />

      {/* Modal Content */}
      <div className={`modal-popup${isModalOpen ? " active" : ""}`}>
        <button className="modal-close" onClick={closeModal}>
          &times;
        </button>
        {modalBook && (
          <div className="modal-content">
            <img src={modalBook.image || "/default-book.png"} alt={modalBook.title} />
            <h2>{modalBook.title}</h2>
            <p><strong>Author:</strong> {modalBook.author}</p>
            <p><strong>Language:</strong> {modalBook.language}</p>
            <p><strong>Price:</strong> ${modalBook.priceNum.toFixed(2)}</p>
            <p>{modalBook.description || modalBook.details || "No description available."}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
