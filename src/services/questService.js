
const Quest = require('../database/Quest');
const characterService = require('./characterService');
const instrumentService = require('./instrumentService');
const songService = require('./songService');
const utilities = require('../helpers/utilities/utilities');
const { daysOfWeek, TIME_OF_DAY ,TIME_OF_DAY_INDEXES, MAX_NUM_CHARACTERS_IN_CREW, D10 } = require('../helpers/constants/constants');

// --- GET --- 
const getAllQuests = async () => {
    try {
        const allQuests = await Quest.getAllQuests();
        return allQuests;
    } catch (error) {
        throw error;
    }
};

const getLastQuest = (quests) => {
    const latestQuest = quests.reduce((acc, quest, indx, arr) => {
        if (acc.day_number < quest.day_number) acc = quest;
        return acc;
    }, { day_number: 0 });
    return latestQuest;
};

// --- POST ---
const createNewQuest = async () => {
    try {

        // 1º Leer characters, songs, instruments y quests
        const [characters, instruments, songs, quests] = await utilities.getAllCollections();


        // 2º Asignar Instrumentos a los character aleatoriamente
        characterService.instrumentAssignationToCharacter(instruments, characters);

        // 3º Leer de la BD el último día registrado:
        const latestQuest = getLastQuest(quests); // No es el day_number sino el objeto que lo contiene, pero de él podemos sacarlo

        // 4º SIMULACION DE LA MISIÓN
        const createdNewQuest = newQuestSimulation(characters, latestQuest);


        const createdQuest = null; 
        // = Quest.createNewQuest(newQuest);
        return createdQuest;
    } catch (error) {
        throw error;
    }
};


const newQuestSimulation = (characters, latestQuest) => { 
    /**
     * Simulará la ejecución de una misión, tal y como se explica en el apartado Misiones:
     *  - Ejecutará la acción de una quest para el día siguiente al último registrado, a base de mensajes de consola (Ver mensajes para más detalles)
     *  - Posteriormente se creará un nuevo registro en la BD de quests con los datos de la quest realizada (Mejor hacer esto fuera de la función)
     */
    const quest = {
        day_number  : latestQuest.day_number + 1, 
        day_week    : (daysOfWeek[latestQuest.day_number + 1] || daysOfWeek[0]), 
        start_time  : "5:00",
        end_time    : "",
        characters  : [], 
        events      : [],
    };

    // Fases de la misión:

    // --- MAÑANA ---
    const morningEvent = createMorningEvent(quest, characters);

    quest.events.push(morningEvent);

    // --- MEDIODIA ---
    const afternoonEvent = createAfternoonEvent(quest);
    quest.events.push(morningEvent);



    // --- TARDE ---
    const nighrfallEvent = createNightfallEvent(quest);
    quest.events.push(morningEvent);


    // --- NOCHE ---


};

const createMorningEvent = (quest, characters) => {
    const morningEvent = {
        day_time : TIME_OF_DAY[TIME_OF_DAY_INDEXES.MORNING],
        time: "5:00",
        messages: ["PREPARATION event starts"],
    };

    for(let i = 0; i < MAX_NUM_CHARACTERS_IN_CREW; i++){
        const randIndex = utilities.getRandomIndex(characters);
        const randomChar = characters[randIndex];
        quest.characters.push(randomChar.name);
        characters.splice(randIndex, 1);
    };
    
    morningEvent.messages.push(`${quest.characters[0]}, ${quest.characters[1]} & ${quest.characters[2]} join the team`);
    return morningEvent;
};

const createAfternoonEvent = async (quest) => {
    // Travesía: empieza a las 12:00
    /**
     * El equipo se pone en marcha Avanzando 1D10 KM. 
     * La velocidad a la que andan dependerá del peso del equipo. 
     * El tiempo de la travesía lo marcará el miembro más lento.
     * 
     *      Tiempo total del personaje (min) = total kms * peso equipo
     * 
     * Pérdida de estamina: Al finalizar la travesía, todos los personajes pierden    
     *  estamina a razón de 1 unidad de stamina cada 30 minutos invertidos.
     * 
     * Parada: Al finalizar la travsia el grupo hace una parada extensa de 5 horas,
     * instanteen que comenzará a anocher.
     */

    const afternoonEvent = {  
        day_time : TIME_OF_DAY[TIME_OF_DAY_INDEXES.AFTERNOON],
        time: "12:00",
        messages: ["CROSSING event starts"],
    };

    // 1º KMs avanzados: 
    const distanceTraveled = D10.throwDie(); 
    afternoonEvent.messages.push(`The team walks ${distanceTraveled} kms.`);

    // 2º Calc el tiempo que lleva al equipo depende del miembro más lento (el que pese más)

    const charactersJSON = await getAssignedCharactersToQuest(quest.characters);


    console.log("-----------------------------------------------------------");
    console.log(charactersJSON);
    console.log("-----------------------------------------------------------");


    const heaviestCharacter = getHeaviestCharacter(charactersJSON);
    afternoonEvent.messages.push(`The slowest member is ${heaviestCharacter} with a weight of 25 kgs.`);

    const totalTime = distanceTraveled * heaviestCharacter.equipment.weight;
    afternoonEvent.messages.push(`Time spent ${totalTime} minutes`);

    const beginingTime = utilities.parseToMinutes(afternoonEvent.time);

    console.log(beginingTime);

    let currentTime = utilities.parseToTimeFormat(beginingTime + totalTime);

    console.log(currentTime);


    afternoonEvent.messages.push(`The current Time now is ${currentTime}`);
    afternoonEvent.messages.push(`CROSSING event finished.`);

    afternoonEvent.messages.push(`CROSSING event finished.`);

    afternoonEvent.messages.push(`RESTING event starting.`);
    afternoonEvent.messages.push(`The group rest by 5 hours`);
    currentTime = utilities.parseToMinutes(currentTime);
    currentTime = utilities.parseToMinutes(currentTime + (5*60));
    afternoonEvent.messages.push(`The current time now is ${currentTime}`);
    quest.end_time = currentTime; // Se irá modificando pero para poder usarlo lo asigno a quest

    afternoonEvent.messages.push(`RESTING event finished.`);
    


};

const getHeaviestCharacter = (characters) => {
    const heaviestChar = characters.reduce((acc, character) => {

        if (acc.equipment.weight < character.equipment.weight) acc = character;
        return acc;
    }, characters[0]);  

    return heaviestChar; 
};

const getAssignedCharactersToQuest = async (characters) => {

    /**
     * ERROR GORDO al usar: 
     * 
     * const charsJSON = await characters.map(async (character) => {
     *      const charJSON = await characterService.getCharacterByName(character);
     *      return charJSON;
     * });
     * 
     * Lo que pasa con este error es que characters.map devuelve un array y no una promesa lo que hace que el
     * await no espere a ninguna promesa y por lo tanto charJSON sea un array vacio (en realidad un array de promesas incumplidas, pero se queda como array vacio)
     * 
     * Para arreglar este error hay dos opciones: 
     *  1 cambiar el .map() por un for para que se se cree correctamente el array 
     * 
     *  2 No cambiar .map() pero sí usar Promise.all() (Si quieres usar esto investiga)
     * 
     * 
     * Solución optada: cambiarlo por:
     * 
     *  const charactersJSON = [];
     *  for(let i = 0; i < characters.length; i++){
     *      const characterName = characters[i];
     *      const characterJSON = await characterService.getCharacterByName(characterName); 
     *      charactersJSON.push(characterJSON);
     *  }
     * 
     */


    const charactersJSON = [];
    for(let i = 0; i < characters.length; i++){
        const characterName = characters[i];
        const characterJSON = await characterService.getCharacterByName(characterName);
        charactersJSON.push(characterJSON);
    }

    console.log("SE ACABO!");
    console.log(charactersJSON);
    return charactersJSON;
}


const createNightfallEvent = (quest) => {

    afternoonEvent.messages.push(`NIGHTFALL event starting.`);
    afternoonEvent.messages.push(`The group prepares the campfire... Time invested : 1 hour`);
    let currentTime = quest.end_time; 
    currentTime = utilities.parseToMinutes(currentTime + (60));
    afternoonEvent.messages.push(`The current time now is ${currentTime}`);
    quest.end_time = currentTime; // Se irá modificando pero para poder usarlo lo asigno a quest

    afternoonEvent.messages.push(`NIGHTFALL event finished.`);
};

const createNightEvent = () => {

};

module.exports = {
    getAllQuests,
    getLastQuest,
    createNewQuest,
}