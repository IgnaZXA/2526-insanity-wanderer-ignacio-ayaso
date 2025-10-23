// Model serán los responsables de crear y leer documentos de nuestra MongoDB
const mongoose = require('mongoose');
const { songSchema } = require('../schemas/songSchema');

module.exports = mongoose.model('Song', songSchema);