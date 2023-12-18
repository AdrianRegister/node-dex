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
                </div>`
    }
}

// when pokemon image clicked, this displays additional info
async function getOnePokemon(pokeName) {
    pokemonInfoContainer.innerHTML = ''
    backToHomeButton.style.display = 'inline'
    const singlePokemon = allPokemonData.find(pokemon => pokemon.name === pokeName)
    const name = capitalizeName(pokeName)
    pokemonInfoContainer.innerHTML = `<div class="single-pokemon-info-div">
                    <span class="pokemon-number">#${singlePokemon.id} </span><span class="pokemon-name">${name}</span>
                    <img class="pokemon-image" src="./pokemon-images/${singlePokemon.id}.png">
                </div><br>
                <div class="extra-info-container">
                    <div class="type-height-weight"></div>
                    <div class="flavor-text"></div>
                    <div class="stats"></div>
                </div>`
    const {data} = await axios.get(`http://localhost:3000/api/v1/pokemon/${pokeName}/flavor-text`)
    const flavorTextArray = data.pokemonFlavorText.flavor_text_entries
    let enFlavorText = ''
    for (const flavorText of flavorTextArray) {
        if (flavorText.language.name === 'en' && flavorText.version.name === 'gold') {
            enFlavorText = flavorText.flavor_text
        }
    }
    const flavorText = document.querySelector('.flavor-text')
    enFlavorText = enFlavorText.replaceAll('\n', ' ')
    enFlavorText = enFlavorText.replaceAll('\f', ' ')
    flavorText.innerHTML = enFlavorText

    const typeColors = {
        'normal': '#a4acaf',
        'water': '#4592c4',
        'fire': '#f08030',
        'grass': '#78c850',
        'electric': '#f8d030',
        'ice': '#98d8d8',
        'fighting': '#c03028',
        'poison': '#a040a0',
        'ground': '#e0c068',
        'flying': '#a890f0',
        'psychic': '#f85888',
        'bug': '#a8b820',
        'rock': '#b8a038',
        'ghost': '#705898',
        'dragon': '#7038f8',
        'dark': '#705848',
        'steel': '#b8b8d0',
        'fairy': '#ee99ac'
    }
    const typeHeightWeight = document.querySelector('.type-height-weight')
    typeHeightWeight.innerHTML = ''
    for (const type of singlePokemon.types) {
        const typeSpan = document.createElement('span')
        typeSpan.setAttribute('class', 'pokemon-type')
        typeSpan.innerText = type.type.name.toUpperCase()

        const typeName = type.type.name.toLowerCase();
        if (typeColors.hasOwnProperty(typeName)) {
            typeSpan.style.backgroundColor = typeColors[typeName];
        }
        typeHeightWeight.appendChild(typeSpan)
    }
    console.log(singlePokemon.stats)
    const statsInfo = document.querySelector('.stats')
    const table = document.createElement('table');
    let statsArray = []
    for (const stat of singlePokemon.stats) {
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('class', 'stat-row');
        const tableCellOne = document.createElement('td');
        tableCellOne.setAttribute('class', 'stat-name-cell');
        const tableCellTwo = document.createElement('td');
        tableCellTwo.setAttribute('class', 'stat-value-cell');

        tableCellOne.textContent = capitalizeName(stat.stat.name).replace('-', ' ')
        tableCellTwo.textContent = stat.base_stat

        tableRow.appendChild(tableCellOne);
        tableRow.appendChild(tableCellTwo);
        table.appendChild(tableRow);
        statsInfo.appendChild(table)

        statsArray.push(stat.base_stat)
    }
    fillStatBar(statsArray)
}

// utility functions
function capitalizeName(name) {
    return name[0].toUpperCase() + name.slice(1, name.length)
}

function fillStatBar(values) {
    const statBars = document.querySelectorAll('.stat-value-cell');

    statBars.forEach((statBar, i) => {
        const total = 255;
        const percentOfFull = (values[i] / total).toFixed(2);

        if (percentOfFull < 0.2) {
            statBar.style.background = `linear-gradient(90deg, #F03A5E ${percentOfFull * 100}%, azure ${percentOfFull * 100}%`;
        } else if (percentOfFull < 0.4) {
            statBar.style.background = `linear-gradient(90deg, #FFD8B1 ${percentOfFull * 100}%, azure ${percentOfFull * 100}%`;
        } else if (percentOfFull < 0.6) {
            statBar.style.background = `linear-gradient(90deg, #FFF7B3 ${percentOfFull * 100}%, azure ${percentOfFull * 100}%`;
        } else if (percentOfFull < 0.8) {
            statBar.style.background = `linear-gradient(90deg, #C1E1C1 ${percentOfFull * 100}%, azure ${percentOfFull * 100}%`;
        } else {
            statBar.style.background = `linear-gradient(90deg, #B2EBF2 ${percentOfFull * 100}%, azure ${percentOfFull * 100}%`;
        }   
    });
}