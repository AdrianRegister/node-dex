const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    types: {
        type: Array,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    stats: {
        type: Array,
        required: true
    },
    /* flavorText: Array,
    image: Buffer */
})

module.exports = mongoose.model('Pokemon', pokemonSchema)
