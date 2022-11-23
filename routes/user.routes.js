const rolesValidation = require('../middleware/roles.middleware');
const { ADMIN } = require('../const/user.const');
const UserModel = require('../models/User.model');
const CommentModel = require('../models/Comment.model');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = require('express').Router();
const { validateData, validatePasswordLength, bcryptEdit, catchError } = require('../utils/bcryptEdit');

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
    const id = req.session.currentUser._id;

    UserModel
        .findById(id)
        .then((user) => {
            res.render('user/edit-profile', user);
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

router.get("/edit/:id", rolesValidation(ADMIN), (req, res, next) => {
    const { id } = req.params;

    UserModel
        .findById(id)
        .then((user) => {
            res.render('user/edit-admin', user);
        })
        .catch(next);
});

router.get('/delete/:id', rolesValidation(ADMIN), (req, res, next) => {
    const { id } = req.params;

    UserModel
        .findByIdAndDelete(id)
        .then((user) => {
            CommentModel
                .deleteMany({ user: user._id })
                .then(() => {
                    res.redirect('/user/community');
                });
        })
        .catch(next);
});

//---------------------------------- POST --------------------------------------

router.post("/edit-admin/:id", rolesValidation(ADMIN), (req, res, next) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    validateData(username, email, res, "admin");
    validatePasswordLength(password, res, "admin");
    bcryptEdit(id, username, email, password)
        .then(() => {
            res.redirect(req.get('referer'));
        })
        .catch((error) => catchError(error, res, next, "admin"));

    //bcryptEdit(req, res, next, id, username, email, password, "admin");

});

router.post("/edit-profile/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    validateData(username, email, res, "profile");
    validatePasswordLength(password, res, "profile");
    bcryptEdit(id, username, email, password)
        .then((user) => {
            req.session.currentUser = user.toObject();
            delete req.session.currentUser.password;
            res.redirect(req.get('referer'));
        })
        .catch((error) => catchError(error, res, next, "profile"));

    //bcryptEdit(req, res, next, id, username, email, password, "profile");

});

module.exports = router;