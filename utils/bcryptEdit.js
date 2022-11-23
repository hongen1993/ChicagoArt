const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require('../models/User.model');
const saltRounds = 10;

function validateData(username, email, res, type) {
    if (username === "" || email === "") {
        res.status(400).render(`user/edit-${type}`, {
            errorMessage:
                "All fields are mandatory. Please provide your username, email and password.",
        });

        return;
    }
}

function validatePasswordLength(password, res, type) {
    if (password && password.length < 4) {
        res.status(400).render(`user/edit-${type}`, {
            errorMessage: "Your password needs to be at least 4 characters long.",
        });

        return;
    }
}

function bcryptEdit(id, username, email, password, req) {
    return bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
            if (password) {
                return UserModel.findByIdAndUpdate(id, { username, email, password: hashedPassword }, { new: true })
            } else {
                return UserModel.findByIdAndUpdate(id, { username, email }, { new: true })
            }
        })
}
function catchError(error, res, next, type) {
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
}

module.exports = { validateData, validatePasswordLength, bcryptEdit, catchError };