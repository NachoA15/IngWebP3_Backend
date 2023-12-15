const Coleccion = require('../db/models/coleccion')

class ServiceColeccion {
    constructor() {}
    
    async findAll() {
        const res = await Coleccion.find();
        return res;
    }
    
    async findById(id) {
        const res = await Coleccion.findById(id);
        return res;
    }

    async create() {
        const res = await Coleccion.create(

        );
        return res;
    }

    async update(id) {
        const res = await Coleccion.findByIdAndUpdate(

        );
        return res;
    }

    /*
    *
    *   {
            returnOriginal: false
        }
    * */

    async delete(id) {
        const res = await Coleccion.findByIdAndDelete(id);
        return res;
    }
}

module.exports = ServiceColeccion