const mongoose = require('mongoose');
// const { instrumentSchema } = require('../schemas/instrumentSchema');

const { Schema } = mongoose;

const instrumentSchema = new Schema({
    name: String, 
    description: String,
});


module.exports = mongoose.model('Instrument', instrumentSchema);