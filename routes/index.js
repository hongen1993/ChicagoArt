module.exports = app => {

    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    const authRouter = require("./auth.routes");
    app.use("/", authRouter);

    const artworksRoutes = require("./artworks.routes");
    app.use("/artworks", artworksRoutes);

}