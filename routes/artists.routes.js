const router = require('express').Router()
const axios = require('axios')
const Handlebars = require('hbs')

Handlebars.registerHelper('paginate', require('handlebars-paginate'))

//----------------------------------GET------------------------------------//

router.get('/:page', (req, res, next) => {
    const { page } = req.params
    axios
        .get(`https://api.artic.edu/api/v1/artists?page=${page}&limit=20`)
        .then((responseArtists) => {
            const pagination = responseArtists.data.pagination
            const artists = responseArtists.data.data
            res.render('artists/list', { artists, pagination: { page: pagination.current_page, pageCount: pagination.total_pages } })
        })
        .catch(next)
})

module.exports = router