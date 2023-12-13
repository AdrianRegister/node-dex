const Pokemon = require('../models/pokemon-model')

async function getAllPokemon(req, res) {
    const allPokemon = await Pokemon.find({})
    res.status(200).json(allPokemon)
}

async function getSinglePokemon(req, res) {
    try {
        const {id: pokemonName} = req.params
        const singlePokemon = await Pokemon.findOne({name: pokemonName})
        res.status(200).json(singlePokemon)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllPokemon,
    getSinglePokemon
}