
const questService = require('../services/questService');



const { getAllCharacters } = require('../services/characterService');
const { getAllInstruments } = require('../services/instrumentService');
const { getAllSongs } = require('../services/characterService');

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

    try {
        // 1º Leer characters, songs, instruments y quests
        const characters = await getAllCharacters();

        const songs = await getAllSongs();
        const instruments = await getAllInstruments();

        const getRandomIndex = (anyArray) => {
            return (Math.floor(Math.random() * anyArray.length));
        };

        const assignInstrument = (instruments, characters) => {
            const auxInstruments = instruments.length;

            for (let i = 0; i < auxInstruments.length; i++) {
                let randIndx = getRandomIndex(instruments);
                const randInstrument = instruments[randIndx];

                // Para que no se repitan los instrumentos descartamos del array el instrumento seleccionado.
                auxInstruments.splice(randIndx, 1);

                randIndx = getRandomIndex(instruments);
                const randCharacter = characters[randIndx];

                randCharacter.equipment[0].instrument = randInstrument.name;
            }
        };

        assignInstrument(instruments.data, characters.data);

        const lastQuests = await questService.getLastQuest();

        console.log(lastQuests);

        const newQuest = {
            day_number  : (lastQuests.day_number + 1),
            day_number  : 1,
            day_week    : "depends",
            start_time  : "5:00",
            end_time    : "22:08",
            characters  : [],
        };

        const createdQuest = await questService.createNewQuest(newQuest);
        res.status(201).send({ status: "OK", data: createdQuest });

    } catch (error) {
        res
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: "Error al realizar la petición POST para crear una nueva Quest",
                data: { error: error?.message || error }
            });
    }
};


module.exports = {
    getAllQuests,
    createNewQuest,
};
