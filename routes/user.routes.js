const rolesValidation = require('../middleware/roles.middleware');
const { ADMIN, USER } = require('../const/user.const');
const UserModel = require('../models/User.model');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = require('express').Router();

//------------------------- GET --------------------------------
router.get("/community", isLoggedIn, (req, res, next) => {

    UserModel
        .find()
        .then((users) => {
            const usersCommunity = [];
            users.map((user) => { if (user._id != req.session.currentUser._id) { usersCommunity.push(user) } });
            res.render('user/community', { usersCommunity });
        })
        .catch(next);
});

router.get("/edit-profile", isLoggedIn, (req, res, next) => {
    const userProfileId = req.session.currentUser._id;

    UserModel
        .findById(userProfileId)
        .then((user) => {
            res.render('user/edit', { user });
        })
        .catch(next);
});

router.get("/profile/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    UserModel
        .findById(id)
        .then((user) => {
            res.render('user/profile', user);
        })
        .catch(next);
});

module.exports = router;