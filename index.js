const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const pokemon = require('./routes/pokemon')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', (req, res, next) => {
    res.status(200)
    res.send('Bienvenido a la Pokedex')
})

app.use('/pokemon', pokemon)

app.listen(port, () => {
    console.log('Server is running in port ' + port + '\nGo to http://localhost:' + port)
})