const mongoose = require("mongoose")
require('dotenv').config();
const connectionString = process.env.DB_URL;

// connect to database
module.exports = dbSetup = () => {
    mongoose.connect((connectionString), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) console.log(err);
    else console.log("database connected successfully");
})
}
