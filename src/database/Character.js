const Character = require('../models/characterModel');

const getAllCharacters = async () => {
    try{
        const characters = await Character.find();
        return characters;
    }catch(error){
        throw error;
    }
};

const getCharacterByName = async (characterName) => {
    try {
        const character = await Character.findOne({name : characterName});
        return character;
    }catch(error){
        throw error;
    }
};


module.exports = {
    getAllCharacters,
    getCharacterByName,
};