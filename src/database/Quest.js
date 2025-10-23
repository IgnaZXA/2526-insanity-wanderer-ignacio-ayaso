const Quest = require('../models/questModel');

const getAllQuests = async () => {
    try {
        const quests = await Quest.find();
        return quests;
    } catch (error) {
        throw error;
    }
};


const createNewQuest = async (newQuest) => {
    try {
        let questToInsert = new Quest(newQuest);
        const createdQuest = await questToInsert.save();
        return createdQuest;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllQuests,
    createNewQuest,
};