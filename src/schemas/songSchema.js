// Model serán los responsables de crear y leer documentos de nuestra MongoDB
const mongoose = require('mongoose');
const { instrumentSchema } = require('./instrumentSchema');
const { Schema } = mongoose;

const songSchema = new Schema({
    name: String,
    description: String,
    time: Number,
    instrument: [instrumentSchema],
});

module.exports = {
    songSchema,
};

