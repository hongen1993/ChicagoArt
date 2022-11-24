const FavouriteModel = require('../models/Favourite.model');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = require('express').Router();

router.get('/delete/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const userProfileId = req.session.currentUser._id;

    FavouriteModel
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect(`/user/profile/${userProfileId}`);
        })
        .catch(next);
});
//------------------------- POST --------------------------------//
router.post("/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const userProfileId = req.session.currentUser._id;
    FavouriteModel
        .create({ title, imageUrl, userId: userProfileId, artworkId: id })
        .then(() => {
            res.redirect(`/user/profile/${userProfileId}`);
        })
        .catch(next);
});

module.exports = router;