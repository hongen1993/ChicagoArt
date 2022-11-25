const UserModel = require('../models/User.model');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = require('express').Router();

router.get('/delete/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const userProfileId = req.session.currentUser._id;

    UserModel
        .findByIdAndUpdate(userProfileId, { $pull: { favourites: { artworkId: id } } })
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

    UserModel
        .findById(userProfileId)
        .then((user) => {
            const validateId = user.favourites.filter((e) => e.artworkId === id);
            if (validateId.length === 0) {
                UserModel
                    .findByIdAndUpdate(userProfileId, { $push: { favourites: { title, imageUrl: imageUrl, userId: userProfileId, artworkId: id } } }, { new: true })
                    .then(() => {
                        res.redirect(`/user/profile/${userProfileId}`);
                    })
                    .catch(next);
            } else {
                res.redirect(`/artworks/details/${id}`);
            }
        });
});

module.exports = router;