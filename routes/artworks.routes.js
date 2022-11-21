const router = require('express').Router();
const axios = require('axios');
// const handlebars = require('hbs');
// handlebars.registerHelper('paginate', require('handlebars-paginate'));

const ChicagoAPI = require('../connect/chicago.connect')
const chicagoAPI = new ChicagoAPI()

//-----------------------------------------------------------------------------GET--------------------------------------------------------------------------------//

router.get("/:page", (req, res, next) => {
    const { page } = req.params;
    chicagoAPI
        .getArtworks(page)
        .then((responseArtworks) => {
            const pagination = responseArtworks.pagination
            const artworks = responseArtworks.data;
            res.render("artworks/list", { artworks, pagination: { page: pagination.current_page, pageCount: pagination.total_pages } });
        })
        .catch(next);
});

router.get("/details/:id", (req, res, next) => {
    const { id } = req.params;
    chicagoAPI
        .getArtwork(id)
        .then((responseArtwork) => {
            const artwork = responseArtwork.data;
            res.render("artworks/art-details", artwork);
        })
        .catch(next);
});

//-----------------------------------------------------------------------------POST------------------------------------------------------------------------------//

router.post("/search", (req, res, next) => {
    const { searchArtwork } = req.body;
    chicagoAPI
        .searchArtworks(searchArtwork)
        .then((searchResults) => {
            const artworks = searchResults.data;
            res.render("artworks/search", { artworks });
        })
        .catch(next);
});

module.exports = router;