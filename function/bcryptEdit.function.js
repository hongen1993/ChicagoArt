const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require('../models/User.model');
const saltRounds = 10;

function bcryptEdit(req, res, next, id, username, email, password, type) {
    if (username === "" || email === "") {
        res.status(400).render(`user/edit-${type}`, {
            errorMessage:
                "All fields are mandatory. Please provide your username, email and password.",
        });

        return;
    }
    if (password && password.length < 4) {
        res.status(400).render(`user/edit-${type}`, {
            errorMessage: "Your password needs to be at least 4 characters long.",
        });

        return;
    }
    bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
            // Create a user and save it in the database
            if (password) {
                return UserModel.findByIdAndUpdate(id, { username, email, password: hashedPassword }, { new: true })
            } else {
                return UserModel.findByIdAndUpdate(id, { username, email }, { new: true })
            }
        })
        .then((user) => {

            if (type === "profile") {
                req.session.currentUser = user.toObject();
                delete req.session.currentUser.password;
            }
            res.redirect(req.get('referer'));
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render(`user/edit-${type}`, { errorMessage: error.message });
            } else if (error.code === 11000) {
                res.status(500).render(`user/edit-${type}`, {
                    errorMessage:
                        "Username and email need to be unique. Provide a valid username or email.",
                });
            } else {
                next(error);
            }
        });
}
module.exports = bcryptEdit;