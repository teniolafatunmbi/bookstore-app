const User = require("../models/user")
const bcrypt = require("bcryptjs")
const { createToken } = require("../services/jwtService")

exports.registerNewUser = (req, res) => {
    //fetch user details from req.body
    //check if a user with this username exists
    User.findOne({username: req.body.username}, (err, existingUser) =>{
        if(err) return res.status(500).json({ message: err })
        if (existingUser) res.status(400).json({ message: "A user with this username already exists"})
    })
    //create a new user
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    }, (err, newUser) => {
        if(err) res.status(500).json({ message: err })
        //hash the user's password.
        bcrypt.genSalt(10, (err, salt) => {
            if(err) return res.status(500).json({ message: err })
            bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                if(err) return res.status(500).json({ message: err })
                //save password to database
                newUser.password = hashedPassword;
                newUser.save((err, savedUser) => {
                    if(err) return res.status(500).json({ message: err })

                    
                    //create JWT for user
                    let token = createToken(savedUser);
                    //send token to user
                    if(!token) return res.status(500).json({ message: "Sorry, we could not authenticate you. Please login"})
                    else return res.status(200).json({ message: "user registration successful", token})
                    
                }) 
            })
        })

    
    })
}

exports.loginUser = (req, res) => {
    // Check if user exists.
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if(err) return res.status(500).json({ message: err})
        if(!foundUser) return res.status(401).json({ message: "Incorrect username"})
        // else return res.status(200).json({ foundUser })
    
        // Compare user's password with stored hash.
        let match = bcrypt.compare(req.body.password, foundUser.password)
        if (!match) return res.status(401).json({ message: "Incorrect password"})

        //create JWT for user
        console.log(foundUser)
        let token = createToken(foundUser);

        //send token to user
        if(!token) return res.status(500).json({ message: "Sorry, we could not authenticate you. Please login"})
        else return res.status(200).json({ 
            message: "user logged in",
            token
        }) 
        
        })
}