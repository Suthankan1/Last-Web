import React, { useState, useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Children.css";

// --- Sample Data
const SAMPLE_BOOKS = [
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=400&q=80",
    title: "The Magical Forest",
    author: "Sarah Pearson",
    price: "$7.99",
    priceNum: 7.99,
    language: "English",
    category: "Children's",
    details: "Embark on a whimsical adventure in a forest where animals talk and magic is real. Perfect for ages 5-9."
  },
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
    title: "Bedtime Stories",
    author: "James Lee",
    price: "$5.49",
    priceNum: 5.49,
    language: "English",
    category: "Children's",
    details: "A collection of gentle bedtime tales to help little ones drift off to sleep with a smile."
  },
  {
    image: "https://images.unsplash.com/photo-1519681393-09d0def993a6?fit=crop&w=400&q=80",
    title: "Learning ABCs",
    author: "Maria Gomez",
    price: "$4.99",
    priceNum: 4.99,
    language: "Spanish",
    category: "Children's",
    details: "A bright and fun introduction to the alphabet, including games and songs. Ideal for preschoolers."
  },
  {
    image: "https://images.unsplash.com/photo-1455885666651-40b5d16b2c87?fit=crop&w=400&q=80",
    title: "The Little Explorer",
    author: "Ahmed Zaki",
    price: "$8.25",
    priceNum: 8.25,
    language: "Arabic",
    category: "Children's",
    details: "Follow a brave child on their journey to discover the wonders of the world. Inspiring and educational."
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

export default function ChildrenCategoryPage({ books = SAMPLE_BOOKS }) {
  const [author, setAuthor] = useState("all");
  const [language, setLanguage] = useState("all");
  const [[minPrice, maxPrice]] = useState([...getPriceRange(books)]);
  const [price, setPrice] = useState(getPriceRange(books)[1]);
  const [modalBook, setModalBook] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const authorOptions = useMemo(
    () => ["All Authors", ...Array.from(new Set(books.map(b => b.author)))],
    [books]
  );
  const languageOptions = useMemo(
    () => ["All Languages", ...Array.from(new Set(books.map(b => b.language)))],
    [books]
  );

  const filteredBooks = useMemo(() => {
    return books.filter(
      b =>
        (author === "all" || b.author === author) &&
        (language === "all" || b.language === language) &&
        (b.priceNum <= price)
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

  React.useEffect(() => {
    if (!isModalOpen) return;
    const handler = e => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isModalOpen]);

  React.useEffect(() => {
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
          <span className="title-accent">Children's</span> Books
        </h1>
        {/* Filters */}
        <section className="filter-section">
          <div className="filter-group">
            <label className="filter-label" htmlFor="filter-author">Author</label>
            <select
              className="filter-select"
              id="filter-author"
              value={author}
              onChange={handleFilterChange(setAuthor)}
            >
              {authorOptions.map(opt => (
                <option key={opt} value={opt === "All Authors" ? "all" : opt}>{opt}</option>
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
            >
              {languageOptions.map(opt => (
                <option key={opt} value={opt === "All Languages" ? "all" : opt}>{opt}</option>
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
        <button className="modal-close" onClick={closeModal}>&times;</button>
        {modalBook && (
          <div className="modal-content">
            <img src={modalBook.image} alt={modalBook.title} />
            <h2>{modalBook.title}</h2>
            <p><strong>Author:</strong> {modalBook.author}</p>
            <p><strong>Language:</strong> {modalBook.language}</p>
            <p><strong>Price:</strong> {modalBook.price}</p>
            <p>{modalBook.details}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
