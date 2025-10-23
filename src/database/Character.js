const Character = require('../models/characterModel');

const getAllCharacters = async () => {
    try{
        const characters = await Character.find();
        return characters;
    }catch(error){
        throw error;
    }
};


module.exports = {
    getAllCharacters,
};