const mongoose = require('mongoose')

const flavorTextSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    flavor_text_entries: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('FlavorText', flavorTextSchema)