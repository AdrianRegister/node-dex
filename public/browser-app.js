const searchForm = document.querySelector('.name-search')
const searchField = document.querySelector('input')
const searchButton = document.querySelector('button')
const backToHomeButton = document.querySelector('.back-to-home')
const pokemonInfoContainer = document.querySelector('.pokemon-info-container')

getAllPokemon()

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    getOnePokemon()
})

backToHomeButton.addEventListener('click', () => {
    backToHomeButton.style.display = 'none'
    pokemonInfoContainer.innerHTML = ''
    getAllPokemon()
})

// search functions
async function getAllPokemon() {
    const {data} = await axios.get('/api/v1/pokemon')
    for (let i = 0; i < data.length; i++) {
        const name = capitalizeName(data[i].name)
        pokemonInfoContainer.innerHTML += `<div class="pokemon-info-div">
                    <span class="pokemon-number">#${data[i].id} </span><span class="pokemon-name">${name}</span>
                    <img class="pokemon-image" src="./pokemon-images/${data[i].id}.png">
                    <p class="pokemon-flavor-text"></p>
                </div>`
    }
}

async function getOnePokemon() {
    const {data} = await axios.get(`/api/v1/pokemon/${searchField.value.toLowerCase()}`)
    searchField.value = ''
    backToHomeButton.style.display = 'inline'
    const name = capitalizeName(data.name)
    pokemonInfoContainer.innerHTML = `<div class="single-pokemon-info-div">
                    <span class="pokemon-number">#${data.id} </span><span class="pokemon-name">${name}</span>
                    <img class="pokemon-image" src="./pokemon-images/${data.id}.png">
                    <p class="pokemon-flavor-text"></p>
                </div><br>`
}

// utility functions
function capitalizeName(name) {
    return name[0].toUpperCase() + name.slice(1, name.length)
}