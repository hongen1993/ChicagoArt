const rolesValidation = require('../middleware/roles.middleware');
const { ADMIN, USER } = require('../const/user.const');
const UserModel = require('../models/User.model');

const router = require('express').Router();

router.get("/edit-profile", isLoggedIn, (req, res, next) => {
    const userProfileId = req.session.currentUser._id;

    UserModel
        .findById(userProfileId)
        .then((user) => {
            res.render('user/edit', { user });
        })
        .catch(next);
});

module.exports = router;