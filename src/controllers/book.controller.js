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