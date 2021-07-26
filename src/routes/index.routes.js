const authroutes = require("./auth.routes");
const bookroutes = require("./book.routes");

module.exports = (app) => {
    app.use("/auth", authroutes);
    app.use(bookroutes);
}
