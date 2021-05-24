const jwt = require("jsonwebtoken")
const secret = "verySecureSECRET";

exports.authenticateUser = (req, res, next) => {
    // check if there is an authorization token
    if(!req.headers.authorization) return res.status(401).json({ message: "Authorization header required"})
    next()
    let splittedHeader = req.headers.authorization.split(" ");
    // console.log(splittedHeader)
    if(splittedHeader[0] !== "Bearer") return res.status(401).json({ message: "Authorization format is Bearer <token>" })

    let token = splittedHeader[1];
    
    // decode the token
    jwt.verify(token, secret, (err, decodedToken) => {
        if(err) return res.status(500).json({ err })
        // check if it is valid
        if(!decodedToken) return res.status(401).json({ message: "invalid authorization token. please login"})
        // allow user to continue with request
        next()
    })
    
    next()
}