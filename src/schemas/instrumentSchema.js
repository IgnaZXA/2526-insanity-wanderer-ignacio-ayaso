const mongoose = require('mongoose');

const { Schema } = mongoose;

const instrumentSchema = new Schema({
    name: String, 
    description: String,
});


module.exports = {
    instrumentSchema
}