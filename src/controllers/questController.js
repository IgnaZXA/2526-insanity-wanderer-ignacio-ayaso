
const questService = require('../services/questService');


const getAllQuests = async (req, res) => {
    try {
        const allQuests = await questService.getAllQuests();

        if (allQuests.length === 0) {
            return res.status(404)
                .send({ message: "No existe ninguna misión" });
        }

        res.send({ status: "OK", data: allQuests });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: "Error al realizar la petición",
                data: { error: error?.message || error }
            });
    }
};


const createNewQuest = async (req, res) => {
    console.log("Creating a new Quest....");
    try {
        const quest = await questService.createNewQuest();

        // const createdQuest = await questService.createNewQuest(newQuest);
        res.status(201).send({ status: "OK", data: "Hola" });

    } catch (error) {
        console.log("Fallo encontrado");
        res
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: "Error al realizar la petición POST para crear una nueva Quest",
                data: { error: error?.message || error }
            });
    };
}

module.exports = {
    getAllQuests,
    createNewQuest,
};
