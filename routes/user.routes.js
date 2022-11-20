const rolesValidation = require('../middleware/roles.middleware');
const { ADMIN, USER } = require('../const/user.const');
const UserModel = require('../models/User.model');

const router = require('express').Router();

router.get('/', roleValidation(USER), (req, res) => {
    // const user = req.session.user;
    res.render('user/index', req.session.user);
});

router.get('/me', (req, res) => {
    const { user } = req.session;
    UserModel.findById(user._id)
        .then((user) => {
            res.render('user/index');
        })
        .catch(next);
});

router.get('/admin', rolesValidation(ADMIN), (req, res) => {
    res.render('user/admin', req.session.user);
});

module.exports = router;