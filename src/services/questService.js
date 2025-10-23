
const Quest = require('../database/Quest');

const getAllQuests = async () => {
    try{
        const allQuests = Quest.getAllQuests();
        return allQuests;
    }catch(error){
        throw error;
    }
};


module.exports = {
    getAllQuests,
}