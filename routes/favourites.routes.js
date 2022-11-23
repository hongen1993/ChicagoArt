const FavouriteModel = require('../models/Favourite.model');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = require('express').Router();

//------------------------- POST --------------------------------
router.post("/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { description } = req.body;
    const userProfileId = req.session.currentUser._id;
    FavouriteModel
        .create({ user: userProfileId, artworkId: id })
        .then(() => {
            res.redirect(`/user/profile/${userProfileId}`);
        })
        .catch(next);
});

module.exports = router;