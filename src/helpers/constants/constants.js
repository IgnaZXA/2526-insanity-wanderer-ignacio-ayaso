const Die = require('../../classes/Die.js');


// TODO: Crear los objetos dados!
const D20  = new Die(20);
const D6   = new Die(6);
const D3   = new Die(3);
const D10  = new Die(10);

const daysOfWeek   = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const TIME_OF_DAY  = ["morning", "afternoon", "nightfall", "night"];

const TIME_OF_DAY_INDEXES = {
  MORNING   : 0,
  AFTERNOON : 1,
  NIGHTFALL : 2,
  NIGHT     : 3,
};

const MAX_NUM_CHARACTERS_IN_CREW = 3;


module.exports = {
  D3,
  D6,
  D10,
  D20,

  daysOfWeek,

  TIME_OF_DAY,
  TIME_OF_DAY_INDEXES,

  MAX_NUM_CHARACTERS_IN_CREW,
};