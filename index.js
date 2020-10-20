const morgan = require('morgan')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const pokemon = require('./routes/pokemon')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.status(200).json({
        code: 1,
        message: 'Bienvenido a la Pokedex'
    })
})

app.use('/pokemon', pokemon)
app.use((req, res, next) => {
    return res.status(404).json({ code: 404, message: 'URL no encontrada 😕' })
})

app.listen(port, () => {
    console.log('Server is running in port ' + port + '\nGo to http://localhost:' + port)
})