const Pokemon = require('../models/pokemon-model')
const FlavorText = require('../models/flavor-text-model')

async function getAllPokemon(req, res) {
    const allPokemon = await Pokemon.find({})
    res.status(200).json(allPokemon)
}

async function getSinglePokemon(req, res) {
    try {
        const {name: pokemonName} = req.params
        const singlePokemon = await Pokemon.findOne({name: pokemonName})
        res.status(200).json(singlePokemon)
    } catch (error) {
        console.log(error)
    }
}

async function getFlavorText(req, res) {
    try {
        const {name: pokemonName} = req.params
        const pokemonFlavorText = await FlavorText.findOne({name: pokemonName})
        res.status(200).json({pokemonFlavorText})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllPokemon,
    getSinglePokemon,
    getFlavorText
}