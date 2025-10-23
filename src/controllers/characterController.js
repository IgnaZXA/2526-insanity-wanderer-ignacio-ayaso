
const characterService = require('../services/characterService');


const getAllCharacters = async (req, res) => {
    try {
        const allCharacters = await characterService.getAllCharacters();

        if (allCharacters.length === 0) {
            return res.status(404)
                .send({ message: "No existe ningún personaje" });
        }

        res.send({ status: "OK", data: allCharacters });
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
    getAllCharacters,
}
