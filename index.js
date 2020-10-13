const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { pokemon } = require('./pokedex.json')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.status(200)
    res.send('Bienvenido a la Pokedex')
})

app.post('/pokemon', (req, res, next) => {
    return res.status(200).send(req.body.name)
})

app.get('/pokemon', (req, res, next) => {
    let name = req.params.name
    res.status(200)
    res.send(pokemon)
})

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id
    if (id >= 0 && id <= 150) {
        return res.status(200).send(pokemon[req.params.id - 1])
    }
    return res.status(404).send('Pokemon no encontrado 😕')
})

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name
    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p
    })
    return pk.length > 0 ? res.status(200).send(pk) : res.status(404).send('Pokemon no encontrado 😕')
})

app.listen(port, () => {
    console.log('Server is running in port ' + port + '\nGo to http://localhost:' + port)
})