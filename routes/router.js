const express = require('express')
const router = express.Router()
const {getAllPokemon, getSinglePokemon, getFlavorText} = require('../controllers/node-dex')

router.route('/').get(getAllPokemon)
router.route('/:name').get(getSinglePokemon)
router.route('/:name/flavor-text').get(getFlavorText)


module.exports = router