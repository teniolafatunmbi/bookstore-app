const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["regular", "admin"],
        default: "regular"
    }
})

const user = mongoose.model("user", userSchema);
module.exports = user;

