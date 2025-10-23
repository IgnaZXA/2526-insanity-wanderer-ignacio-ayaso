
const Instrument = require('../database/Instrument');

const getAllInstruments = async () => {
    try{
        const allInstruments = Instrument.getAllInstruments();
        return allInstruments;
    }catch(error){
        throw error;
    }
};


module.exports = {
    getAllInstruments,
}