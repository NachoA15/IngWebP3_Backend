const Evento = require('../db/models/evento')

class ServiceEvento {
    constructor() {}
    
    async findAll() {
        const res = await Evento.find();
        return res;
    }
    
    async findById(id) {
        const res = await Evento.findById(id);
        return res;
    }

    async getCoordinatesFromZipCode(codPostal) {
        const mapboxRes = await (await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${codPostal}.json?country=es&types=postcode&language=es&access_token=${process.env.MAPBOX_TOKEN}&limit=1`)).json();
        const coordenadas = mapboxRes.features[0].geometry.coordinates;
        return {lat: coordenadas[1], lon: coordenadas[0]}
    }

    async findNearZipCode(codPostal) {
        const coordenadas = await this.getCoordinatesFromZipCode(codPostal);
        const res = await Evento.find({
            $and: [
                {
                    $and: [
                        {
                            lat: {$gte: (coordenadas.lat - 0.2)}
                        },
                        {
                            lat: {$lte: (coordenadas.lat + 0.2)}
                        }
                    ]
                },
                {
                    $and: [
                        {
                            lon: {$gte: (coordenadas.lon - 0.2)}
                        },
                        {
                            lon: {$lte: (coordenadas.lon + 0.2)}
                        }
                    ]
                }
            ]
        });

        return res;
    }

    async crearEvento(nombre, timestamp, codPostal, organizador, imagen) {
        console.log(codPostal)
        const coordenadas = await this.getCoordinatesFromZipCode(codPostal);
        return await this.create(
            nombre,
            timestamp,
            codPostal,
            coordenadas.lat,
            coordenadas.lon,
            organizador,
            imagen
        )
    }

    async create(nombre, timestamp, lugar, lat, lon, organizador, imagen) {
        const res = await Evento.create(
            {
                nombre: nombre,
                timestamp: timestamp,
                lugar: lugar,
                lat: lat,
                lon: lon,
                organizador: organizador,
                imagen: imagen
            }
        );
        return res;
    }

    async update(id, nombre, timestamp, lugar, lat, lon, imagen) {
        const res = await Evento.findByIdAndUpdate(id,
            {
                nombre: nombre,
                timestamp: timestamp,
                lugar: lugar,
                lat: lat,
                lon: lon,
                imagen: imagen
            },
            {
                returnOriginal: false
            }
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
        const res = await Evento.findByIdAndDelete(id);
        return res;
    }
}

module.exports = ServiceEvento