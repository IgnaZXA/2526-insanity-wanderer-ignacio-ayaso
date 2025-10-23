
const Quest = require('../models/questModel');

const getAllQuests = async () => {
    try{
        const quests = await Quest.find();
        return quests;
    }catch(error){
        throw error;
    }
};


module.exports = {
    getAllQuests,
};