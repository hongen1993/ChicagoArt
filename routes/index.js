module.exports = app => {

    app.use("/", require("./index.routes"));

    app.use("/auth", require("./auth.routes"));

    app.use("/artworks", require("./artworks.routes"));

    app.use("/user", require("./user.routes"));

    app.use("/comment", require("./comment.routes"));

}