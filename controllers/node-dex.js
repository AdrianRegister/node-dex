const Pokemon = require('../models/pokemon-model')
const FlavorText = require('../models/flavor-text-model')

async function getAllPokemon(req, res) {
    const {name} = req.query
    const queryObject = {}
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }
    let result = Pokemon.find(queryObject)
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)
    const pokemon = await result
    res.status(200).json(pokemon)
}

async function getSinglePokemon(req, res) {
    try {
        const {name: pokemonNameOrID} = req.params
        const singlePokemon = await Pokemon.findOne({
            $or: [
                {name: pokemonNameOrID},
                {id: Number(pokemonNameOrID) || 0}
            ]
        })
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