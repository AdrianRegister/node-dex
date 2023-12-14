const searchForm = document.querySelector('.name-search')
const searchField = document.querySelector('input')
const searchButton = document.querySelector('button')
const backToHomeButton = document.querySelector('.back-to-home')
const pokemonInfoContainer = document.querySelector('.pokemon-info-container')

let allPokemonData = []
initializeData()

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    searchResults()
})

backToHomeButton.addEventListener('click', () => {
    searchField.value = ''
    backToHomeButton.style.display = 'none'
    initializeData()
})

pokemonInfoContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const pokemonDiv = e.target.parentNode
        getOnePokemon(pokemonDiv.dataset.name)
    }
})

// make one API call to get all data
async function initializeData() {
    const {data} = await axios.get('/api/v1/pokemon')
    allPokemonData = data
    getAllPokemon()
}

// search functions
function getAllPokemon() {
    pokemonInfoContainer.innerHTML = ''
    for (let i = 0; i < allPokemonData.length; i++) {
        const name = capitalizeName(allPokemonData[i].name)
        pokemonInfoContainer.innerHTML += `<div class="pokemon-info-div" data-name="${allPokemonData[i].name}">
                    <span class="pokemon-number">#${allPokemonData[i].id} </span><span class="pokemon-name">${name}</span>
                    <img class="pokemon-image" src="./pokemon-images/${allPokemonData[i].id}.png">
                    <p class="pokemon-flavor-text"></p>
                </div>`
    }
}

function searchResults() {
    pokemonInfoContainer.innerHTML = ''
    backToHomeButton.style.display = 'inline'
    let names = allPokemonData.map(pokemon => pokemon.name)
    const regex = new RegExp(searchField.value, 'i')
    let matchingNames = names.filter(name => regex.test(name))

    for (i = 0; i < matchingNames.length; i++) {
        const matchingPokemon = allPokemonData.find(pokemon => pokemon.name === matchingNames[i])
        const name = capitalizeName(matchingNames[i])
        pokemonInfoContainer.innerHTML += `<div class="pokemon-info-div" data-name="${matchingPokemon.name}">
                    <span class="pokemon-number">#${matchingPokemon.id} </span><span class="pokemon-name">${name}</span>
                    <img class="pokemon-image" src="./pokemon-images/${matchingPokemon.id}.png">
                    <p class="pokemon-flavor-text"></p>
                </div>`
    }
}

// when pokemon image clicked, this displays additional info
function getOnePokemon(pokeName) {
    pokemonInfoContainer.innerHTML = ''
    backToHomeButton.style.display = 'inline'
    const singlePokemon = allPokemonData.find(pokemon => pokemon.name === pokeName)
    const name = capitalizeName(pokeName)
    pokemonInfoContainer.innerHTML = `<div class="single-pokemon-info-div">
                    <span class="pokemon-number">#${singlePokemon.id} </span><span class="pokemon-name">${name}</span>
                    <img class="pokemon-image" src="./pokemon-images/${singlePokemon.id}.png">
                    <p class="pokemon-flavor-text"></p>
                </div><br>`
}

// utility functions
function capitalizeName(name) {
    return name[0].toUpperCase() + name.slice(1, name.length)
}