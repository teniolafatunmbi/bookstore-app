const Book = require("../models/book")

exports.createNewBook = function (req, res) {
    Book.create({
        // title: req.body.title, 
        // author: req.body.author,
        // description: req.body.description,
        // category: req.body.category,
        // purchaseCount: req.body.purchaseCount,
        // imageUrl: req.body.imageUrl,
        // tags: req.body.tags,
        // color: req.body.color
        ...req.body
    }, (err, newBook) => {
        if (err) return res.status(500).json({ message: err})
        else return res.status(200).json({ message: "new book created", newBook})
    })
}

exports.fetchAllBooks = function (req, res) {
    let conditions = {}
    if(req.query.category){
        conditions.category = req.query.category
    }
    //check req.query for filters
    // console.log(conditions)
    // console.log(req.query)
    //if filters exist, use them in Model.find query
    Book.find(req.query, (err, books) => {
        if(err) return res.status(500).json({ message: err })
        else return res.status(200).json({ books })
    
    })
}  


exports.fetchSingleBook = function (req, res) {
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
}

exports.updateSingleBook = function (req, res) {
    Book.updateOne({ category: req.body.category, imageUrl: req.body.imageUrl, tags: req.body.tags }, (err, book) => {
        if(err) return res.status(500).json({ message: err})
        else return res.status(200).json({ message: `Changed info of student with id: ${req.params.id}`, book })
    })
}

exports.deleteSingleBook = function (req, res) {
    Book.deleteOne({ _id: req.params.id }, (err) => {
        if(err) return res.status(500).json({ message: err });
        else return res.status(200).json({ message: `Student with id: ${req.params.id} deleted`})
    })
}