const fs = require('fs')


const names = [
    'bulbasaur',  'ivysaur',    'venusaur',   'charmander', 'charmeleon',
    'charizard',  'squirtle',   'wartortle',  'blastoise',  'caterpie',
    'metapod',    'butterfree', 'weedle',     'kakuna',     'beedrill',
    'pidgey',     'pidgeotto',  'pidgeot',    'rattata',    'raticate',
    'spearow',    'fearow',     'ekans',      'arbok',      'pikachu',
    'raichu',     'sandshrew',  'sandslash',  'nidoran-f',  'nidorina',
    'nidoqueen',  'nidoran-m',  'nidorino',   'nidoking',   'clefairy',
    'clefable',   'vulpix',     'ninetales',  'jigglypuff', 'wigglytuff',
    'zubat',      'golbat',     'oddish',     'gloom',      'vileplume',
    'paras',      'parasect',   'venonat',    'venomoth',   'diglett',
    'dugtrio',    'meowth',     'persian',    'psyduck',    'golduck',
    'mankey',     'primeape',   'growlithe',  'arcanine',   'poliwag',
    'poliwhirl',  'poliwrath',  'abra',       'kadabra',    'alakazam',
    'machop',     'machoke',    'machamp',    'bellsprout', 'weepinbell',
    'victreebel', 'tentacool',  'tentacruel', 'geodude',    'graveler',
    'golem',      'ponyta',     'rapidash',   'slowpoke',   'slowbro',
    'magnemite',  'magneton',   'farfetchd',  'doduo',      'dodrio',
    'seel',       'dewgong',    'grimer',     'muk',        'shellder',
    'cloyster',   'gastly',     'haunter',    'gengar',     'onix',
    'drowzee',    'hypno',      'krabby',     'kingler',    'voltorb',
    'electrode', 'exeggcute',  'exeggutor', 'cubone',    'marowak',
  'hitmonlee', 'hitmonchan', 'lickitung', 'koffing',   'weezing',
  'rhyhorn',   'rhydon',     'chansey',   'tangela',   'kangaskhan',
  'horsea',    'seadra',     'goldeen',   'seaking',   'staryu',
  'starmie',   'mr-mime',    'scyther',   'jynx',      'electabuzz',
  'magmar',    'pinsir',     'tauros',    'magikarp',  'gyarados',
  'lapras',    'ditto',      'eevee',     'vaporeon',  'jolteon',
  'flareon',   'porygon',    'omanyte',   'omastar',   'kabuto',
  'kabutops',  'aerodactyl', 'snorlax',   'articuno',  'zapdos',
  'moltres',   'dratini',    'dragonair', 'dragonite', 'mewtwo',
  'mew',       'chikorita',  'bayleef',   'meganium',  'cyndaquil',
  'quilava',   'typhlosion', 'totodile',  'croconaw',  'feraligatr',
  'sentret',   'furret',     'hoothoot',  'noctowl',   'ledyba',
  'ledian',    'spinarak',   'ariados',   'crobat',    'chinchou',
  'lanturn',   'pichu',      'cleffa',    'igglybuff', 'togepi',
  'togetic',   'natu',       'xatu',      'mareep',    'flaaffy',
  'ampharos',  'bellossom',  'marill',    'azumarill', 'sudowoodo',
  'politoed',  'hoppip',     'skiploom',  'jumpluff',  'aipom',
  'sunkern',   'sunflora',   'yanma',     'wooper',    'quagsire',
  'espeon',    'umbreon',    'murkrow',   'slowking', 'misdreavus', 'unown', 'wobbuffet', 'girafarig',
  'pineco',     'forretress', 'dunsparce', 'gligar',
  'steelix',    'snubbull',   'granbull',  'qwilfish',
  'scizor',     'shuckle',    'heracross', 'sneasel',
  'teddiursa',  'ursaring',   'slugma',    'magcargo',
  'swinub',     'piloswine',  'corsola',   'remoraid',
  'octillery',  'delibird',   'mantine',   'skarmory',
  'houndour',   'houndoom',   'kingdra',   'phanpy',
  'donphan',    'porygon2',   'stantler',  'smeargle',
  'tyrogue',    'hitmontop',  'smoochum',  'elekid',
  'magby',      'miltank',    'blissey',   'raikou',
  'entei',      'suicune',    'larvitar',  'pupitar',
  'tyranitar',  'lugia',      'ho-oh',     'celebi'
  ]



for (i = 0, j = 1; j < 252; i++, j++) {
    let file = JSON.parse(fs.readFileSync(`./public/pokemon-flavor-text/${j}.json`))
    // parsedFile = JSON.parse(file)
    file.name = names[i]
    fs.writeFileSync(`./public/pokemon-flavor-text/${j}.json`, JSON.stringify(file, null, 2))
}