const axios = require('axios')

class ChicagoAPI {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://api.artic.edu/api/v1'
        })
    }

    getArtworks(page) {
        return this.axios.get(`/artworks?page=${page}&limit=20`).then((response) => response.data)
    }

    getArtwork(id) {
        return this.axios.get(`/artworks/${id}`).then((response) => response.data)
    }

    searchArtworks(searchArtwork) {
        return this.axios.get(`/artworks/search?q=${searchArtwork}&fields=id,title,image_id,artist_title&limit=20`).then((response) => response.data)
    }
    getEvent(id) {
        return this.axios.get(`/events/${id}`).then((response) => response.data)
    }
}


module.exports = ChicagoAPI
