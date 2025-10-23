const mongoose = require('mongoose');
const { Schema } = mongoose;

const questSchema = new Schema({
    day_number: Number,
    day_week: String,
    start_time: String,
    end_time: String,
    characters: [String],
});


module.exports = {
    questSchema,
};