const {Schema, model} = require('mongoose')

const coleccionSchema = new Schema({

})

const Coleccion = model('Coleccion', coleccionSchema)

module.exports = Coleccion