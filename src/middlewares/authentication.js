const { decodeToken } = require("../services/jwtService");

exports.authenticateUser = (req, res, next) => {
    // check if there is an authorization token
    if(!req.headers.authorization) return res.status(401).json({ message: "Authorization header required"});
    let splittedHeader = req.headers.authorization.split(" ");
    
    if(splittedHeader[0] !== "Bearer") return res.status(401).json({ message: "Authorization format is Bearer <token>" });

    let token = splittedHeader[1];
    
    // decode the token
    let decodedToken = decodeToken(token);

    // check if valid
    if(!decodedToken) return res.status(401).json({ message: "invalid authorization token. please login"})
    else {
        req.user = decodedToken;
        next();
    }
    
}

exports.checkIfAdmin = (req, res, next) => {
    if(req.user.role !== "admin") return res.status(401).json({ message: "this route is restricted to admin users"});
    return next();
}