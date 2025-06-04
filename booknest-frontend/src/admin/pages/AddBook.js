import React, { useState } from "react";
import axios from "axios";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    language: "",
    price: "",
    image: "",
    description: "",
    googleDriveLink: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsError(true);
        setMessage("You must be logged in as admin to add books.");
        return;
      }

      const response = await axios.post("/api/books/add", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsError(false);
      setMessage("✅ Book added successfully!");
      setForm({
        title: "",
        author: "",
        category: "",
        language: "",
        price: "",
        image: "",
        description: "",
        googleDriveLink: ""
      });
    } catch (err) {
      console.error("Add book failed:", err);
      setIsError(true);
      setMessage("❌ Failed to add book: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h2>Add New Book (Admin Only)</h2>
      {message && (
        <p style={{ color: isError ? "red" : "green", fontWeight: "bold" }}>{message}</p>
      )}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input name="title" placeholder="Title*" value={form.title} onChange={handleChange} required />
        <input name="author" placeholder="Author*" value={form.author} onChange={handleChange} required />
        <input name="category" placeholder="Category*" value={form.category} onChange={handleChange} required />
        <input name="language" placeholder="Language" value={form.language} onChange={handleChange} />
        <input name="price" type="number" step="0.01" placeholder="Price*" value={form.price} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={4} />
        <input name="googleDriveLink" placeholder="Google Drive Link*" value={form.googleDriveLink} onChange={handleChange} required />

        <button type="submit" style={{ padding: "0.5rem", backgroundColor: "#007bff", color: "#fff", border: "none" }}>
          Add Book
        </button>
      </form>
    </div>
  );
}
