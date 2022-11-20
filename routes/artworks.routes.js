const router = require('express').Router();
const axios = require('axios');
const Handlebars = require('hbs');
Handlebars.registerHelper('paginate', require('handlebars-paginate'));

/**
 * GET
 */
router.get("/:page", (req, res, next) => {
    const { page } = req.params;
    axios
        .get(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=20`)
        .then((responseArtworks) => {
            const pagination = responseArtworks.data.pagination
            const artworks = responseArtworks.data.data;
            res.render("artworks/list", { artworks, pagination: { page: pagination.current_page, pageCount: pagination.total_pages } });
        })
        .catch(next);
});

router.get("/details/:id", (req, res, next) => {
    const { id } = req.params;
    axios
        .get(`https://api.artic.edu/api/v1/artworks/${id}`)
        .then((responseArtwork) => {
            const artwork = responseArtwork.data.data;
            res.render("artworks/art-details", artwork);
        })
        .catch(next);
});

/**
 * POST
 */

router.post("/search", (req, res, next) => {
    const { searchArtwork } = req.body;

    axios
        .get(`https://api.artic.edu/api/v1/artworks/search?q=${searchArtwork}`)
        .then((responseArtworks) => {
            const artworks = responseArtworks.data.data;
            res.render("artworks/search", { artworks });
        })
        .catch(next);
});

module.exports = router;