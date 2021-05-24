const express = require("express")
const router = express.Router()
const { createNewBook, fetchAllBooks, fetchSingleBook, updateSingleBook, deleteSingleBook } = require("../controllers/bookControllers");
const { authenticateUser } = require("../middlewares/authentication")
//POST request to /books to create a new book
router.post("/books", authenticateUser, createNewBook)

//GET request to /books to fetch all books
router.get("/books", authenticateUser, fetchAllBooks)

//GET request to /books/id to fetch a single book
router.get("/books/:id", authenticateUser,fetchSingleBook)

//PUT request to /books/id to update a single book
router.put("/books/:id", authenticateUser, updateSingleBook)
// DELETE request to /books/id to delete
router.delete("/books/:id", authenticateUser, deleteSingleBook)

module.exports = router