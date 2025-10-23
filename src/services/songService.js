
const Song = require('../database/Song');

const getAllSongs = async () => {
    try{
        const allSongs = Song.getAllSongs();
        return allSongs;
    }catch(error){
        throw error;
    }
};


module.exports = {
    getAllSongs,
}