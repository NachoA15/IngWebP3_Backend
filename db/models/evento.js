const {Schema, model} = require('mongoose')

const eventoSchema = new Schema({
    nombre: {type: String, required: true},
    timestamp: {type: Date, required: true},
    lugar: {type: String, required: true},
    lat: {type: Number, required: true},
    lon: {type: Number, required: true},
    organizador: {type: String, required: true},
    imagen: {type: String, required: true}
})

const Evento = model('Evento', eventoSchema)

module.exports = Evento