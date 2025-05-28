import React, { useState, useMemo } from "react";
import "../styles/Children.css";

const SAMPLE_BOOKS = [
  {
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?fit=crop&w=400&q=80",
    title: "Atomic Habits",
    author: "James Clear",
    price: "$15.99",
    priceNum: 15.99,
    language: "English",
    category: "Non-Fiction",
    details: "A practical guide to building good habits and breaking bad ones."
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?fit=crop&w=400&q=80",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: "$18.49",
    priceNum: 18.49,
    language: "English",
    category: "Non-Fiction",
    details: "A thought-provoking journey through human history."
  },
  {
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?fit=crop&w=400&q=80",
    title: "Educated",
    author: "Tara Westover",
    price: "$14.25",
    priceNum: 14.25,
    language: "English",
    category: "Non-Fiction",
    details: "A memoir about a woman's quest for knowledge and self-invention."
  }
];

function getPriceRange(books) {
  let min = books.length ? books[0].priceNum : 0;
  let max = books.length ? books[0].priceNum : 0;
  for (const b of books) {
    if (b.priceNum < min) min = b.priceNum;
    if (b.priceNum > max) max = b.priceNum;
  }
  min = Math.floor(min);
  max = Math.ceil(max);
  return [min, max];
}

export default function NonFiction() {
  const [author, setAuthor] = useState("all");
  const [language, setLanguage] = useState("all");
  const [[minPrice, maxPrice]] = useState([ ...(getPriceRange(SAMPLE_BOOKS)) ]);
  const [price, setPrice] = useState(getPriceRange(SAMPLE_BOOKS)[1]);
  const [modalBook, setModalBook] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const authorOptions = useMemo(
    () => ["All Authors", ...Array.from(new Set(SAMPLE_BOOKS.map(b => b.author)))],
    []
  );
  const languageOptions = useMemo(
    () => ["All Languages", ...Array.from(new Set(SAMPLE_BOOKS.map(b => b.language)))],
    []
  );

  const filteredBooks = useMemo(() => {
    return SAMPLE_BOOKS.filter(
      b =>
        (author === "all" || b.author === author) &&
        (language === "all" || b.language === language) &&
        (b.priceNum <= price)
    );
  }, [author, language, price]);

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
  React.useEffect(() => {
    if (!isModalOpen) return;
    const handler = e => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isModalOpen]);
  React.useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleAddToCart(book) {
    alert(`Added "${book.title}" to cart!`);
  }

  return (
    
    <div className="category-container">
      <h1 className="stylish-title"><span className="title-accent">Non-Fiction</span> Books</h1>
      <section className="filter-section">
        <div className="filter-group">
          <label className="filter-label" htmlFor="filter-author">Author</label>
          <select
            className="filter-select"
            id="filter-author"
            value={author}
            onChange={handleFilterChange(setAuthor)}
            data-filter="author"
          >
            {authorOptions.map(opt => (
              <option key={opt} value={opt === "All Authors" ? "all" : opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label" htmlFor="filter-language">Language</label>
          <select
            className="filter-select"
            id="filter-language"
            value={language}
            onChange={handleFilterChange(setLanguage)}
            data-filter="language"
          >
            {languageOptions.map(opt => (
              <option key={opt} value={opt === "All Languages" ? "all" : opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label" htmlFor="filter-price">Price up to</label>
          <input
            type="range"
            className="filter-range"
            id="filter-price"
            min={minPrice}
            max={maxPrice}
            step="0.01"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            style={{marginBottom: "3px"}}
          />
          <div className="price-range-values">
            <span>${minPrice.toFixed(2)}</span>
            <span>${price.toFixed(2)}</span>
            <span>${maxPrice.toFixed(2)}</span>
          </div>
        </div>
      </section>
      <main>
        <div className={`book-grid${isFading ? " fade-exit" : ""}`}>
          {filteredBooks.map((book, idx) => (
            <div
              key={book.title + idx}
              className="book-card"
              style={{ animationDelay: `${0.045 * idx + 0.09}s` }}
            >
              <div className="book-image-box">
                <img src={book.image} alt={`${book.title} cover`} />
              </div>
              <div className="book-card-content">
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
                <div className="book-price">{book.price}</div>
                <div className="card-btn-group">
                  <button
                    className="btn secondary btn-view-details"
                    onClick={e => {
                      e.stopPropagation();
                      openModal(book);
                    }}
                  >
                    <span style={{display:"inline-flex",alignItems:"center"}}>
                      <svg width="18" height="18" style={{marginRight:"5px",marginTop:"-1px"}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>
                      View Details
                    </span>
                  </button>
                  <button className="btn btn-add-cart" onClick={() => handleAddToCart(book)}>
                    <span style={{display:"inline-flex",alignItems:"center"}}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight:"5px"}} viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h2l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.45H6"/></svg>
                      Add to Cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <div
        className={`modal-blur-bg${isModalOpen ? " active" : ""}`}
        onClick={closeModal}
        style={{ cursor: isModalOpen ? "pointer" : "default" }}
        aria-hidden={!isModalOpen}
      />
      <div className={`modal-popup${isModalOpen ? " active" : ""}`}>
        <button
          className="modal-close"
          aria-label="Close"
          onClick={closeModal}
          tabIndex={isModalOpen ? 0 : -1}
        >
          &times;
        </button>
        {modalBook && (
          <>
            <div className="modal-center-content">
              <img
                src={modalBook.image}
                className="modal-book-img"
                alt="Book cover"
              />
              <div className="modal-book-details">
                <div className="modal-title">{modalBook.title}</div>
                <div className="modal-meta">
                  {modalBook.category} | {modalBook.author} | {modalBook.language}
                </div>
                <div className="modal-price">{modalBook.price}</div>
              </div>
            </div>
            <div className="modal-body">
              <div>
                {modalBook.details}
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-add-cart"
                onClick={() => handleAddToCart(modalBook)}
              >
                <span style={{display:"inline-flex",alignItems:"center"}}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight:"6px"}} viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h2l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.45H6"/></svg>
                  Add to Cart
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}