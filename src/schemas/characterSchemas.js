const mongoose = require('mongoose');

const { Schema } = mongoose;


const pouchSchema = new Schema({
    coins: Number,
});

const equipmentSchema = new Schema({
    instrument: String,
    pouch: pouchSchema,
    weight: Number
});

const characterSchema = new Schema({
    name: String,
    occupation: String,
    description: String,
    stamina: Number,
    favourite_drink: String,
    equipment: [equipmentSchema],
});

module.exports = {
    equipmentSchema,
    pouchSchema,
    characterSchema,
};