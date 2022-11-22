require("dotenv").config();

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);


require("./config/session.config")(app);

hbs.registerPartials('views/partials');

const projectName = "Chicago Art";


app.locals.appTitle = `${projectName}`;

app.use((req, res, next) => {
    app.locals.userNav = !!req.session.currentUser;
    if (req.session.currentUser) {
        app.locals.currentUser = req.session.currentUser;
        app.locals.admin = req.session.currentUser.role === "Admin";
    }
    next();
});

require("./routes")(app)

require("./error-handling")(app);

module.exports = app;