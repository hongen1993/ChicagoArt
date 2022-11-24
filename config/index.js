const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const favicon = require("serve-favicon");

const path = require("path");

const session = require("express-session");

const MongoStore = require("connect-mongo");

const hbs = require("hbs");

const MONGO_URI = process.env.MONGODB_URI;

module.exports = (app) => {

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  hbs.registerPartials('views/partials');

  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");
  app.use(express.static(path.join(__dirname, "..", "public")));

  hbs.registerHelper('paginate', require('handlebars-paginate'));
  hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
  hbs.registerHelper('ifCond', function (v1, v2, options) {
    if (String(v1) === String(v2)) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  app.use(
    favicon(path.join(__dirname, "..", "public", "images", "favicon.ico"))
  );
};
