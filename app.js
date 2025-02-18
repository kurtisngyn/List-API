const express = require("express");
const app = express();
const path = require("path");
const booksRouter = require("./routes/books");

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to serve static images from "public" folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Use the books router
app.use("/books", booksRouter);

// Handle 404 errors (invalid endpoints)
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Start the server @localhost/3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});