/**
 * AQUI HAY UN ERROR GORDO:
 * Hay un problema de "Dependencia Circular":
 *  Existe una dependencia circular entre los archivos que hace que el characterService no se cargue completamente cuando utilities.js lo requiere.
 *  El núcleo del problema es que characterService.js necesita a utilities.js y viceversa, y tal y como están implementadas
 *  los requires (los imports en commonJS ) nada más cargarselos dos archivos se llaman el uno al otro no dando tiempo a que se carguen 
 *  las funciones que contienen.
 * 
 *  Por eso, al hacer un POST a la ruta "localhost:3000/api/quest" el problema que surje es que la función getAllCharacters()
 *  (y getAllSongs(), getAllInstruments() y getAllQuest(), pero como la primera es la de los characters, es con la que el codigo se ralla),
 *  aun no se ha cargado y por ello la respuesta devuelta es:
 * 
 *  status: 500 
 *  response: 
 * 
 *  {
 *   "status": "FAILED",
 *   "message": "Error al realizar la petición POST para crear una nueva Quest",
 *   "data": {
 *     "error": "characterService.getAllCharacters is not a function"
 *   }
 *  }
 * 
 * Cómo se debería arreglar?
 *  Usando importación dinámica en lugar de estática 
 * (con import: https://es.javascript.info/modules-dynamic-imports    https://lenguajejs.com/javascript/modulos/dynamic-import/)
 * con require simplemente es mover las líneas de require() dentro de las funciones que lo necesitan.
 * 
 * Como lo voy a hacer yo es moviendo el require en characterService de "getRandomIndex" adentro de la función que lo necesita, es decir,
 * de "instrumentAssignationToCharacter(instruments, characters)".
 *  
 */


async function getAllCollections() {
  const characterService  = require('../../services/characterService');
  const questService      = require('../../services/questService');
  const instrumentService = require('../../services/instrumentService');
  const songService       = require('../../services/songService');

  const characters        = await characterService.getAllCharacters();
  const instruments       = await instrumentService.getAllInstruments();
  const songs             = await songService.getAllSongs();
  const quests            = await questService.getAllQuests();

  return [characters, instruments, songs, quests];
}
// ---

function getRandomIndex(array) {
  return (Math.floor(Math.random() * array.length));
}

/**
 * Pasando un timepo en formato xx:yy donde xx son horas e yy minutos obtener la cant total de minutos
 * @param {} time 
 */
function parseToMinutes(time) {
  const [hours, minutes] = time.split(":");
  return (hours*60 + minutes);
};

function parseToTimeFormat(minutes){
  let hours = 0;
  while(minutes > 60){
    minutes /= 60;
    hours ++;
  }

  minutes  = Math.floor(minutes);
  return (`${(hours < 10) ? `0${hours}` : `${hours}` }:${(minutes < 10) ? (`0${minutes}`) : (`${minutes}`)}`);
}

module.exports = {
  getAllCollections,
  getRandomIndex,
  parseToMinutes,
  parseToTimeFormat,
}; 