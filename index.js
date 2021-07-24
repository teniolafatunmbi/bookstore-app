const express = require("express");
const dbSetup = require("./src/database/setup");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;

//REQUIRE ROUTES
const bookRoutes = require("./src/routes/book.routes");
const authRoutes = require("./src/routes/auth.routes");

// SEEDERS
const { seedAdmin } = require("./src/seeders/admin");
// console.log(seedAdmin());

app.use(express.json());

dbSetup();

app.use("/auth", authRoutes);
app.use(bookRoutes);

app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`Server is running on port ${port}`);
})
