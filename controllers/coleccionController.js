const ServiceColeccion = require('../services/coleccionService')
const serviceColeccion = new ServiceColeccion();

const {checkGoogleToken} = require('../services/tokenChecker');

const listarColeccions = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const tokenCheck = await checkGoogleToken(token, req.method, req.params.email);

        if (tokenCheck !== 'ok') {
            res.status(401).send({message: tokenCheck});
        } else {
            if (typeof req.params.id !== 'undefined' && req.params.id !== null && req.params.id !== '') {
                const coleccion = await serviceColeccion.findById(req.params.id.trim());
                res.status(200).send({coleccion: coleccion});
            } else {
                const coleccions = await serviceColeccion.findAll();
                res.status(200).send({coleccions: coleccions});
            }
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const crearColeccion = async(req, res) => {
    try {
        const token = req.headers.authorization;
        const tokenCheck = await checkGoogleToken(token, req.method, req.params.email);

        if (tokenCheck !== 'ok') {
            res.status(401).send({message: tokenCheck});
        } else {
            // QUIZÁS HAYA QUE CHECKEAR ALGO
            const coleccion = await serviceColeccion.create(

            );
            res.status(201).send({message: 'Coleccion creado con éxito', coleccion: coleccion});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const actualizarColeccion = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const tokenCheck = await checkGoogleToken(token, req.method, req.params.email);

        if (tokenCheck !== 'ok') {
            res.status(401).send({message: tokenCheck});
        } else {
            if (typeof req.params.id !== 'undefined' && req.params.id !== null && req.params.id !== '' && !req.params.id.startsWith(' ')) {
                // QUIZÁS HAYA QUE CHECKEAR ALGO
                const coleccion = await serviceColeccion.update(
                    req.params.id
                );
                if (coleccion) {
                    res.status(200).send({message: 'Coleccion ' + req.params.id + ' actualizado con éxito', coleccion: coleccion});
                } else {
                    res.status(400).send({message: 'No existe el coleccion ' + req.params.id});
                }
            } else {
                res.status(400).send({success: false, message: 'No se puede realizar la acción. Compruebe que se pasa el ID de coleccion correctamente'});
            }
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const borrarColeccion = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const tokenCheck = await checkGoogleToken(token, req.method, req.params.email);

        if (tokenCheck !== 'ok') {
            res.status(401).send({message: tokenCheck});
        } else {
            const coleccion = await serviceColeccion.delete(req.params.id);
            if (coleccion) {
                res.status(200).send({message: 'Coleccion ' + req.params.id + ' borrado con éxito', coleccion: coleccion});
            } else {
                res.status(400).send({message: 'No existe el coleccion ' + req.params.id});
            }
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {listarColeccions, crearColeccion, actualizarColeccion, borrarColeccion}