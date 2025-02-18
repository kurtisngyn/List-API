// Set up the server
const express = require("express");
// import the express module
const app = express();
const path = require("path");
// import the booksrouter from routes/books.js file
const booksRouter = require("./routes/books");

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to serve static images from "public" folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Use the books router so at localhost/books
app.use("/books", booksRouter);

// Handle 404 errors (invalid endpoints) display endpoint not found
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Start the server @localhost/3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});