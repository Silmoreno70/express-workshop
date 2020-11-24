window.onload = init
const api_url = 'http://localhost:3000'

function get_options() {
    const headers = {
        headers: {
            //'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    }
    return headers
}

function init() {
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')
        load_pokemons()
    } else {
        window.location.href = 'index.html'
    }
}

function load_pokemons() {
    axios.get(api_url + '/pokemon', get_options())
        .then(res => {
            display_pokemon(res.data.message)
        })
        .catch(err => {
            console.error(err);
        })
}

function display_pokemon(pokemon){
    var body = document.querySelector('body')
    for (let i = 0; i < pokemon.length; i++) {
        body.innerHTML += `<h3>${pokemon[i].pok_name}</h3>`
    }
}