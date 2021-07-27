const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const { createToken } = require("../services/jwtService")

exports.registerNewUser = async(req, res) => {
    //fetch user details from req.body
    //check if a user with this username exists
    try{
        const existingUser = await User.findOne({username: req.body.username});
        if (existingUser) return res.status(500).json({ message: "A user with this username already exists"});


        //create a new user
        const newUser = await User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    role: req.body.role
                    });
        const salt = await bcrypt.genSalt(10);
        
        //hash password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        newUser.password = hashedPassword;

        //save password to database
        await newUser.save();
        
        console.log(newUser);
        //create JWT for user
        let token = createToken(newUser);

        //send token to user
        if(!token) return res.status(500).json({ 
            message: "Sorry, we could not authenticate you. Please login"
        });
        else return res.status(200).json({ 
            message: "user registration successful", token
        });
    }
    catch(err){
        throw err;
    }
};

exports.loginUser = async(req, res) => {
    try{
        const foundUser = User.findOne({username: req.body.username});
        if(!foundUser) return res.status(401).json({ 
            message: "Incorrect username "
        });

        //compare user's password with stored hash
        let match = bcrypt.compare(req.body.password, foundUser.password)
        if (!match) return res.status(401).json({ 
            message: "Incorrect password"
        })

        //create JWT for user
        console.log(foundUser)
        let token = createToken(foundUser);

        //send token to user
        if(!token) return res.status(500).json({ 
            message: "Sorry, we could not authenticate you. Please login"
        })
        else return res.status(200).json({ 
            message: "user logged in",
            token
        });
    }
    catch(err){
        throw err;
    }
}