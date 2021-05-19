const User = require("../models/user")

exports.registerNewUser = (req, res) => {
    //fetch user details from req.body
    //check if a user with this username exists
    User.findOne({username: req.body.username}, (err, existingUser) =>{
        if(err) res.status(500).json({ message: err })
        if (existingUser) res.status(400).json({ message: "A user with this username already exists"})
    })
    //create a new user
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    })
    //hash the user's password.
    //save password to database
    //create JWT for user
    //send token to user
}