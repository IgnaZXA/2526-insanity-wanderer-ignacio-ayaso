

const Song = require('../models/songModel');

const getAllSongs = async () => {
    try{
        const songs = await Song.find();
        return songs;
    }catch(error){
        throw error;
    }
};


module.exports = {
    getAllSongs,
};