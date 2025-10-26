const mongoose = require('mongoose');
const { Schema } = mongoose;


const questEvent = new Schema({
    day_time : String,
    time: String,
    messages : [String],
});


const questSchema = new Schema({
    day_number: Number,
    day_week: String,
    start_time: String,
    end_time: String,
    events : [questEvent],
    characters: [String],
});



module.exports = {
    questSchema,
};