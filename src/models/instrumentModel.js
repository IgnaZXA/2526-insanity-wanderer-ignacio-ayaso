const mongoose = require('mongoose');
const { instrumentSchema } = require('../schemas/instrumentSchema');

module.exports = mongoose.model('Instrument', instrumentSchema);