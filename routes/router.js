const express = require('express')
const router = express.Router()
const {getAllPokemon, getSinglePokemon} = require('../controllers/node-dex')

router.route('/').get(getAllPokemon)
router.route('/:name').get(getSinglePokemon)


module.exports = router