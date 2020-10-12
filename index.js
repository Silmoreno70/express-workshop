const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { pokemon } = require('./pokedex.json')

app.get('/', (req, res, next) => {
    res.status(200)
    res.send('Bienvenido a la Pokedex')
})

app.get('/pokemon/all', (req, res, next) => {
    let name = req.params.name
    res.status(200)
    res.send(pokemon)
})

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id
    if (id >= 0 && id <= 150) {
        res.status(200)
        return res.send(pokemon[req.params.id - 1])
    }
    res.status(404)
    res.send('Pokemon no encontrado 😕')
})

app.get('/pokemon/:name', (req, res, next) => {
    const name = req.params.name
    for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name == name) {
            res.status(200)
            return res.send(pokemon[i])
        }
    }
    res.status(404)
    res.send('Pokemon no encontrado 😕')
})

app.listen(port, () => {
    console.log('Server is running in port ' + port + '\nGo to http://localhost:' + port)
})