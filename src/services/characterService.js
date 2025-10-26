
const Character = require('../database/Character');

const getAllCharacters = async () => {
    try {
        const allCharacters = await Character.getAllCharacters();
        return allCharacters;
    } catch (error) {
        throw error;
    }
};

const getCharacterByName = async (characterName) => {
    try {
        const character = await Character.getCharacterByName(characterName);
        return character;
    }catch(error){
        throw error;
    }
};

function instrumentAssignationToCharacter(instruments, characters) {
    const { getRandomIndex } = require('../helpers/utilities/utilities');

    characters.map((character) => {
        if (instruments.length > 0) {
            const randIndx = getRandomIndex(instruments);
            const randomInstr = instruments[randIndx];
            character.equipment.instrument = randomInstr.name;
            instruments.splice(randIndx, 1);
        }
    });
}



module.exports = {
    getAllCharacters,
    getCharacterByName,

    instrumentAssignationToCharacter,
}