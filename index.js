require('./db/mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const {routerEvento} = require('./routes/routerEvento')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})

app.use(cors())

app.use('/eventos', routerEvento)

const port = 5001
app.listen(port, () => {
    console.log('Listening on port ' + port)
})