require('dotenv').config()
const connectDB = require('./db/connect')
const Pokemon = require('./models/pokemon-model')
const fs = require('fs')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Pokemon.deleteMany()
        for (let pokeID = 1; pokeID < 152; pokeID++) {
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

start()