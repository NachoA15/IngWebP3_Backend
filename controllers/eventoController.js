const ServiceEvento = require('../services/eventoService')
const serviceEvento = new ServiceEvento();

const {checkGoogleToken} = require('../services/tokenChecker');

const listarEventos = async (req, res) => {
    try {
        if (typeof req.params.id !== 'undefined' && req.params.id !== null && req.params.id !== '') {
            const evento = await serviceEvento.findById(req.params.id.trim());
            res.status(200).send({evento: evento});
        } else if (typeof req.query.codPostal !== 'undefined' && req.query.codPostal !== null && req.query.codPostal !== '') {
            const eventos = await serviceEvento.findNearZipCode(req.query.codPostal.trim());
            res.status(200).send({eventos: eventos});
        } else {
            const eventos = await serviceEvento.findAll();
            res.status(200).send({eventos: eventos});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const crearEvento = async(req, res) => {
    try {
        const token = req.headers.authorization;
        const tokenCheck = await checkGoogleToken(token, req.method, req.params.email);

        if (tokenCheck !== 'ok') {
            res.status(401).send({message: tokenCheck});
        } else {
            try {
                const evento = await serviceEvento.crearEvento(
                    req.body.nombre,
                    req.body.timestamp,
                    req.body.codPostal,
                    req.body.organizador,
                    req.body.imagen
                );
                res.status(201).send({message: 'Evento creado con éxito', evento: evento});
            } catch (error) {
                res.status(500).send({message: 'No se pueden obtener las coordenadas para el código postal' + req.body.codPostal + '.'})
            }
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const actualizarEvento = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const tokenCheck = await checkGoogleToken(token, req.method, req.params.email);

        if (tokenCheck !== 'ok') {
            res.status(401).send({message: tokenCheck});
        } else {
            if (typeof req.params.id !== 'undefined' && req.params.id !== null && req.params.id !== '' && !req.params.id.startsWith(' ')) {
                // QUIZÁS HAYA QUE CHECKEAR ALGO
                const evento = await serviceEvento.update(
                    req.params.id
                );
                if (evento) {
                    res.status(200).send({message: 'Evento ' + req.params.id + ' actualizado con éxito', evento: evento});
                } else {
                    res.status(400).send({message: 'No existe el evento ' + req.params.id});
                }
            } else {
                res.status(400).send({success: false, message: 'No se puede realizar la acción. Compruebe que se pasa el ID de evento correctamente'});
            }
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const borrarEvento = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const tokenCheck = await checkGoogleToken(token, req.method, req.params.email);

        if (tokenCheck !== 'ok') {
            res.status(401).send({message: tokenCheck});
        } else {
            const evento = await serviceEvento.delete(req.params.id);
            if (evento) {
                res.status(200).send({message: 'Evento ' + req.params.id + ' borrado con éxito', evento: evento});
            } else {
                res.status(400).send({message: 'No existe el evento ' + req.params.id});
            }
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {listarEventos, crearEvento, actualizarEvento, borrarEvento}