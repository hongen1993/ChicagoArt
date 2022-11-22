const rolesValidation = require('../middleware/roles.middleware');
const { ADMIN } = require('../const/user.const');
const UserModel = require('../models/User.model');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = require('express').Router();
const bcryptEdit = require('../function/bcryptEdit.function')

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
    console.log(id);

    UserModel
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/user/community');
        })
        .catch(next);
});

//---------------------------------- POST --------------------------------------

router.post("/edit-admin/:id", rolesValidation(ADMIN), (req, res, next) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    bcryptEdit(req, res, next, id, username, email, password, "admin");

});

router.post("/edit-profile/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    bcryptEdit(req, res, next, id, username, email, password, "profile");

});

module.exports = router;