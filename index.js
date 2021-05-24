const express = require("express");
const dbSetup = require("./src/database/setup")
const app = express();
const port = process.env.PORT || 4000

//REQUIRE ROUTES
const bookRoutes = require("./src/routes/bookRoutes")
const authRoutes = require("./src/routes/authRoutes")

// SEEDERS
const { seedAdmin } = require("./src/seeders/admin")
// console.log(seedAdmin());

app.use(express.json())

dbSetup();

app.use("/auth", authRoutes)
app.use(bookRoutes)

app.listen(port, (err) =>{
    if(err) console.log(err)
    else console.log(`Server is running on port ${port}`)
})
