const Instrument = require('../models/instrumentModel');

const getAllInstruments = async () => {
    try{
        const instruments = await Instrument.find();
        return instruments;
    }catch(error){
        throw error;
    }
};

const getInstrument = async (instrumentName) => {
    try{
        const instrument = await Instrument.findOne({name: instrumentName});
        return instrument;
    }catch(error){
        throw error;
    }
}


module.exports = {
    getAllInstruments,
    getInstrument,
};