const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.port || 3000
const connectDB = require('./db/connect')
const pokemonRouter = require('./routes/router')

app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1/pokemon', pokemonRouter)

app.get('/', (req, res) => {
    res.status(200).send('<h2>HOME PAGE</h2>')
})

async function start() {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()