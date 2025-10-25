
const Instrument = require('../database/Instrument');

const getAllInstruments = async () => {
    try{
        const allInstruments = await Instrument.getAllInstruments();
        return allInstruments;
    }catch(error){
        throw error;
    }
};

const getInstrument = async (instrumentName) => {
    try{
        const instrument = await Instrument.getInstrument(instrumentName);
        return instrument;
    }catch(error){
        throw error;
    };
};


module.exports = {
    getAllInstruments,
    getInstrument,
};