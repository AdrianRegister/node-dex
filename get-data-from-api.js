const fs = require('node:fs')
const axios = require('axios')

function getPokeData() {
    for (let pokeNumber = 152; pokeNumber < 252; pokeNumber++) {
        /* axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`)
            .then(response => {
                const {id, name, types, height, weight, stats} = response.data
                fs.writeFileSync(`./public/pokemon-data/${pokeNumber}.json`, JSON.stringify({id, name, types, height, weight, stats}, null, 2))
            }) */
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeNumber}`)
            .then(response => {
                const {flavor_text_entries} = response.data
                fs.writeFileSync(`./public/pokemon-flavor-text/${pokeNumber}.json`, JSON.stringify({flavor_text_entries}, null, 2))
            })    
        /* axios.get(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`, {
            responseType: 'arraybuffer'
        })
            .then(response => {
                fs.writeFileSync(`./public/pokemon-images/${pokeNumber}.png`, Buffer.from(response.data, 'binary'))
            })      */   
    }
}

async function getNames () {
    let names = []
    for (let i = 200; i < 252; i++) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            const {name} = response.data
            names.push(name)
        } catch (error) {
            console.log(error)
        }   
    }
    console.log(names)
}

// getNames()
getPokeData()