// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();


require("./config")(app);


require("./config/session.config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "starter-code";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

require("./routes")(app)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;