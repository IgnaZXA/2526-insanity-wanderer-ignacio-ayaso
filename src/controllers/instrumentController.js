
const instrumentService = require('../services/instrumentService');


const getAllInstruments = async (req, res) => {
    try {
        const allInstruments = await instrumentService.getAllInstruments();

        if (allInstruments.length === 0) {
            return res.status(404)
                .send({ message: "No existe ningún instrumento" });
        }

        res.send({ status: "OK", data: allInstruments });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: "Error al realizar la petición",
                data: { error: error?.message || error }
            });
    }
}


module.exports = {
    getAllInstruments,
}
