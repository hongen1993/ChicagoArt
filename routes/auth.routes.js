const router = require("express").Router()

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;

const UserModel = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const fileUploader = require('../config/cloudinary.config');
// --------------------------------------- GET ------------------------------------------//

router.get("/signup", isLoggedOut, (req, res) => { res.render("auth/signup"); });

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }
    res.redirect("/");
  });
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

// --------------------------------------- POST ------------------------------------------//

router.post("/signup", isLoggedOut, fileUploader.single('image'), (req, res) => {
  const { username, email, password } = req.body;

  if (username === "" || email === "" || password === "") {
    res.status(400).render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });

    return;
  }

  if (password.length < 4) {
    res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 4 characters long.",
    });

    return;
  }

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      // Create a user and save it in the database
      return UserModel.create({ username, email, password: hashedPassword, imageUrl: req.file.path });
    })
    .then((user) => {
      res.redirect("/auth/login");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage:
            "Username and email need to be unique. Provide a valid username or email.",
        });
      } else {
        next(error);
      }
    });
});

router.post("/login", isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;

  // Check that username, email, and password are provided
  if (email === "" || password === "") {
    res.status(400).render("auth/login", {
      errorMessage:
        "All fields are mandatory. Please provide username, email and password.",
    });

    return;
  }

  if (password.length < 4) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 4 characters long.",
    });
  }

  // Search the database for a user with the email submitted in the form
  UserModel.findOne({ email })
    .then((user) => {
      // If the user isn't found, send an error message that user provided wrong credentials
      if (!user) {
        res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });
        return;
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt
        .compare(password, user.password)
        .then((isSamePassword) => {
          if (!isSamePassword) {
            res
              .status(400)
              .render("auth/login", { errorMessage: "Wrong credentials." });
            return;
          }

          // Add the user object to the session object
          req.session.currentUser = user.toObject();
          // Remove the password field
          delete req.session.currentUser.password;

          res.redirect(`/user/profile/${req.session.currentUser._id}`);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

module.exports = router;