
const Character = require('../database/Character');

const getAllCharacters = async () => {
    try{
        const allCharacters = Character.getAllCharacters();
        
        return allCharacters;
    }catch(error){
        throw error;
    }
};


module.exports = {
    getAllCharacters,
}