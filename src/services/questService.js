
const Quest = require('../database/Quest');

// --- GET --- 
const getAllQuests = async () => {
    try {
        const allQuests = await Quest.getAllQuests();
        return allQuests;
    } catch (error) {
        throw error;
    }
};

const getLastQuest = async () => {
    try {
        const allQuests = await Quest.getAllQuests();
        const allQuestsData = allQuests.data;
        let lastDayQuest = allQuestsData[0];
        for (let i = 0; i < allQuestsData.length; i++) { 
            if (lastDayQuest.day_number < allQuestsData[i]) {
                lastDayQuest = allQuestsData[i];
            }
        }
        return lastDayQuest;
    } catch (error) {
        throw error;
    }
}

// --- POST ---
const createNewQuest = async (newQuest) => {
    try {
        const createdQuest = Quest.createNewQuest(newQuest);
        return createdQuest;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllQuests,
    getLastQuest,
    createNewQuest,
}