
const instrumentService = require('../services/instrumentService');


const getAllInstruments = async (req, res) => {
    try {
        const allInstruments = await instrumentService.getAllInstruments();

        if (allInstruments.length === 0) {
            return res.status(404)
                .send({ message: "No existe ningún instrumento" });
        }

        console.log(`Inside all instruments`, allInstruments);
        res.send({ status: "OK", data: allInstruments });
    } catch (error) {

    }
}


module.exports = {
    getAllInstruments,
}
