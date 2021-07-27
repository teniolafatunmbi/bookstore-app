const Book = require("../models/book.model")

exports.createNewBook =  async(req, res) => {
    try{
        const newBook = await Book.create({ ...req.body });
        return res.status(200).json({ message: "new book created", newBook});
    }
    catch(err){
        throw err;
    }
}

exports.fetchAllBooks = async(req, res) => {
    try{
        let conditions = {}
        if(req.query.category){
            conditions.category = req.query.category
        }
        //check req.query for filters
        console.log(conditions)
        // console.log(req.query)
        //if filters exist, use them in Model.find query
        console.log(Book.find({}))
        const books = await Book.find(req.query);
        return res.status(200).json({ books });
    }
    catch(err){
        throw err;
    }
}  


exports.fetchSingleBook = async(req, res) => {
    try{
        const book = await Book.findOne({ _id: req.params.id});
        if(!book) return res.status(404).json({ message: "book not found"});
        else return res.status(200).json({ book });
    }
    catch(err){
        throw err;
    }
}

exports.updateSingleBook = async(req, res) => {
    try{
        const book = await Book.updateOne({ category: req.body.category, imageUrl: req.body.imageUrl, tags: req.body.tags });
        return res.status(200).json({ message: `Changed info of student with id: ${req.params.id}`, book });
    }
    catch(err){
        throw err;
    }
}

exports.deleteSingleBook = (req, res) => {
    Book.deleteOne({ _id: req.params.id }, (err) => {
        if(err) return res.status(500).json({ message: err });
        else return res.status(200).json({ message: `Student with id: ${req.params.id} deleted`})
    })
}