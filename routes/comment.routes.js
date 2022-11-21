const CommentModel = require('../models/Comment.model');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = require('express').Router();

//------------------------- POST --------------------------------
router.post("/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { description } = req.body;
    const userProfileId = req.session.currentUser._id;
    CommentModel
        .create({ description, user: userProfileId, artworkId: id })
        .then(() => {
            res.redirect(`/artworks/details/${id}#form-comment`);
        })
        .catch(next);
});

module.exports = router;