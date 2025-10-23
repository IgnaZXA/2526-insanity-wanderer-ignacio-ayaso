
const songService = require('../services/songService');


const getAllSongs = async (req, res) => {
    try {
        const allSongs = await songService.getAllSongs();

        if (allSongs.length === 0) {
            return res.status(404)
                .send({ message: "No existe ninguna canción" });
        }

        res.send({ status: "OK", data: allSongs });
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
    getAllSongs,
}
