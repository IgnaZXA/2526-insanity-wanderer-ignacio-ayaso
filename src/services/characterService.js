
const Character = require('../database/Character');
const { getRandomIndex } = require('../helpers/utilities/utilities');

const getAllCharacters = async () => {
    try {
        const allCharacters = await Character.getAllCharacters();
        return allCharacters;
    } catch (error) {
        throw error;
    }
};

function instrumentAssignationToCharacter(instruments, characters) {

    instruments.map( (instrument) => {
        const randomChar = characters[getRandomIndex(characters)];
        randomChar.equipment[0].instrument = instrument;
        characters.splice(randIndx, 1);
    });
}



module.exports = {
    getAllCharacters,


    instrumentAssignationToCharacter,
}