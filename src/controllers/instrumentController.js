
const instrumentService = require('../services/instrumentService');


const getAllInstruments = async (req, res) => {
    try {
        const allInstruments = await instrumentService.getAllInstruments();

        if (allInstruments.length === 0) {
            return res.status(404)
                .send({ message: "No existe ningún instrumento" });
        }

        res.send({ status: "OK", data: allInstruments });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: "Error al realizar la petición",
                data: { error: error?.message || error }
            });
    }
}

const getInstrument = async (req, res) => {
    const { instrumentName } = req.params;
    if(!instrumentName){
        return res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: "Parameter 'instrumentName' can not be empty"
                },
            });
    };


    try{
        const instrument = await instrumentService.getInstrument(instrumentName);
        if(!instrument){
            return res
            .status(404)
            .send({ status: "FAILED",
                data: {error: `Can't find instrument with the name: '${instrumentName}'`}
            });
        }

        res.status(200).send({
            status:'OK',
            data: instrument,
        });
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ 
                status: "FAILED",
                message: "Error!",
                data: {error: error?.message || error }
            });
    }
};


module.exports = {
    getAllInstruments,
    getInstrument,
}
