const express = require("express");
const router = express.Router();

// Initial books array
let books = [
    { id: 1, title: "Chainsaw Man", author: "Tatsuki Fujimoto", imageUrl: "/public/chainsawman.jpg", year: 2018 },
    { id: 2, title: "COLORLESS", author: "KENT", imageUrl: "/public/COLORLESS.jpg", year: 2022 },
    { id: 3, title: "Gachiakuta", author: "Kei Urana", imageUrl: "/public/Gachiakuta.jpg", year: 2024 }
];

// GET all books at /books
router.get("/", (req, res) => {
    res.json(books);
});

// GET a book by ID at /books/(id) and return if nonexistent ID is present
router.get("/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
});

// POST a new book as new id if all required data for a book is there
router.post("/", (req, res) => {
    const { title, author, imageUrl, year } = req.body;

    if (!title || !author || !imageUrl || !year) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        imageUrl,
        year
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (update) a book by ID
router.put("/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    const { title, author, imageUrl, year } = req.body;

    if (title) book.title = title;
    if (author) book.author = author;
    if (imageUrl) book.imageUrl = imageUrl;
    if (year) book.year = year;

    res.json(book);
});

// DELETE a book by ID if /book/(id) if valid existing ID
router.delete("/:id", (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book not found" });
    }
    // When removing 
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});

// export
module.exports = router;