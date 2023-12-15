require('dotenv').config()
const connectDB = require('./db/connect')
const Pokemon = require('./models/pokemon-model')
const FlavorText = require('./models/flavor-text-model')

const startPokemon = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Pokemon.deleteMany()
        for (let pokeID = 1; pokeID < 252; pokeID++) {
            const data = require(`./public/pokemon-data/${pokeID}.json`)
            await Pokemon.create(data)
        }
        console.log('Success!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const startFlavorText = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await FlavorText.deleteMany()
        for (let pokeID = 1; pokeID < 252; pokeID ++) {
            const flavorData = require(`./public/pokemon-flavor-text/${pokeID}.json`)
            await FlavorText.create(flavorData)
        }
        console.log('Success!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

// startFlavorText()

// startPokemon()