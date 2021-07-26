const express = require("express");
const dbSetup = require("./src/config");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;

// SEEDERS
const { seedAdmin } = require("./src/seeders/admin");
// console.log(seedAdmin());

app.use(express.json());

//DATABASE SETUP
dbSetup();

app.get("/", async(req, res) => {
    try{
        return res.status(200).json({ message: "welcome to a bookstore application."});
    }
    catch(err){
        throw err;
    }
})

//REQUIRE ROUTES.
require("./src/routes/index.routes")(app);



app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`Server is running on port ${port}`);
})
