const Instrument = require('../models/instrumentModel');

const getAllInstruments = async () => {
    try{
        const instruments = await Instrument.find();
        return instruments;
    }catch(error){
        throw error;
    }
};


module.exports = {
    getAllInstruments,
};