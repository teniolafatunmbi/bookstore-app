const express = require("express")
const app = express();
const mongoose = require("mongoose")
const port = 4000
const connectionString = "mongodb://localhost:27017/bookapp"

app.use(express.json())
// connect to database
mongoose.connect((connectionString), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) console.log(err)
    else console.log("database connected successfully")
})


// CREATE BOOK SCHEMA
const bookSchema = new mongoose.Schema({
    title: String, 
    author: String,
    description: String,
    category: String,
    purchaseCount: Number,
    imageUrl: String, 
    tags: Array,
    color: String
})

const Book = mongoose.model("Book", bookSchema)

//POST request to /books to create a new book
app.post("/books", (req, res) => {
    //retrieve new book details from req.body
    //create a new book and save to database.
    Book.create({
        title: req.body.title, 
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        purchaseCount: req.body.purchaseCount,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        color: req.body.color
    }, (err, newBook) => {
        if (err) return res.status(500).json({ message: err})
        else return res.status(200).json({ message: "new book created", newBook})
    })
        //send back res to client
})

//GET request to /books to fetch all books
app.get("/books", (req, res) => {
    //fetch all books and send response to client.
    Book.find({}, (err, books) => {
        if(err) return res.status(500).json({ message: err })
        else {
            return res.status(200).json({ books })
        }
    })  
})
//GET request to /books/id to fetch a single book
app.get("/books/:id", (req, res) => {
    Book.findOne({ _id: req.params.id}, (err, book) => {
        if (err){ 
            return res.status(500).json({ message: err})
        }
        else if (!book){
            return res.status(404).json({ message: "book not found" })
        } 
        else{
            return res.status(200).json({ book })
        }
    })
})
//PUT request to /books/id to update a single book
// DELETE request to /books/id to delete

app.listen(port, (err) =>{
    if(err) console.log(err)
    else console.log(`Server is running on port ${port}`)
})
