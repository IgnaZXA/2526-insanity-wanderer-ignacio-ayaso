const mongoose = require('mongoose');
const { Schema } = mongoose;
const { characterSchema } = require('./characterSchemas');

const questSchema = new Schema({
    day_number: Number,
    day_week: String,
    start_time: String,
    end_time: String,
    characters: [characterSchema],
});


module.exports = {
    questSchema,
};