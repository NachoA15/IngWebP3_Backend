require('./db/mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const {routerColeccion} = require('./routes/routerColeccion')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})

app.use(cors())

app.use('/coleccion', routerColeccion)

const port = 5001
app.listen(port, () => {
    console.log('Listening on port ' + port)
})