const express = require("express");
const dbSetup = require("./src/database/setup")
const app = express();
const bookRoutes = require("./src/routes/bookRoutes")
const port = process.env.PORT || 4000



app.use(express.json())
dbSetup();
app.use(bookRoutes)

app.listen(port, (err) =>{
    if(err) console.log(err)
    else console.log(`Server is running on port ${port}`)
})
