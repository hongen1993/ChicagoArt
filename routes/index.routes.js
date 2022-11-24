const express = require('express');
const router = express.Router();

const ChicagoAPI = require('../connect/chicago.connect')
const chicagoAPI = new ChicagoAPI()

/* GET home page */
router.get('/', (req, res, next) => {
  const id = 5027

  chicagoAPI
    .getEvent(id)
    .then((eventResponse) => {
      console.log(eventResponse.data.image_url)
      const event = eventResponse.data;
      res.render('index', event)
    })
    .catch(next)
})

module.exports = router;
