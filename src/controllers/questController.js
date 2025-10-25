
const questService = require('../services/questService');
const characterService = require('../services/characterService');
const instrumentService = require('../services/instrumentService');
const songService = require('../services/songService');
const utilities = require('../helpers/utilities/utilities');

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

        // 1º Leer characters, songs, instruments y quests
        const [characters, instruments, songs, quests] = await utilities.getAllCollections();


        // 2º Asignar 
        characterService.instrumentAssignationToCharacter(instruments, characters);

        console.log(characters);


        res.status(200).send(characters);


        // console.log("Fallo");

        // const lastQuests = await questService.getLastQuest();


        // console.log(lastQuests);

        // const newQuest = {
        //     day_number  : (lastQuests.day_number + 1),
        //     day_number  : 1,
        //     day_week    : "depends",
        //     start_time  : "5:00",
        //     end_time    : "22:08",
        //     characters  : [],
        // };

        // const createdQuest = await questService.createNewQuest(newQuest);
        // res.status(201).send({ status: "OK", data: createdQuest });

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
