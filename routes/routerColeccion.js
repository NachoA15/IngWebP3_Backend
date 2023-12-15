const express = require('express')
const routerColeccion = express.Router()
const coleccionController = require('../controllers/coleccionController')

routerColeccion.get('/', coleccionController.listarColeccions)
            .get('/:id', coleccionController.listarColeccions)
            .post('/', coleccionController.crearColeccion)
            .put('/:id', coleccionController.actualizarColeccion)
            .delete('/:id', coleccionController.borrarColeccion);

module.exports = {routerColeccion};