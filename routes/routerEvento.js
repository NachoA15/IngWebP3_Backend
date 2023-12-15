const express = require('express')
const routerEvento = express.Router()
const eventoController = require('../controllers/eventoController')

routerEvento.get('/', eventoController.listarEventos)
            .get('/:id', eventoController.listarEventos)
            .post('/', eventoController.crearEvento)
            .put('/:id', eventoController.actualizarEvento)
            .delete('/:id', eventoController.borrarEvento);

module.exports = {routerEvento: routerEvento};