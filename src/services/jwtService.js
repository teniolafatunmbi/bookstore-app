const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiry = Number(process.env.TOKEN_EXPIRY);

exports.createToken = (user) => {
    try {
        let token = jwt.sign({
            id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role
        }, secret, {expiresIn: expiry});
        return token;
    } catch (err) {
        throw err;
    }
}

exports.decodeToken = (token) => {
    try {
        let decodedToken = jwt.verify(token, secret);
        return decodedToken;
    } catch (err) {
        throw err;
    }
}