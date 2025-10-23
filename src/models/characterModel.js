const mongoose = require('mongoose');
const {characterSchema} = require('../schemas/characterSchemas');

module.exports = mongoose.model('Character', characterSchema);