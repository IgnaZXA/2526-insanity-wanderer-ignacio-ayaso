const express = require("express");
const router = express.Router();

const instrumentController = require('../controllers/instrumentController');
const questController = require('../controllers/questController');
const characterController = require("../controllers/characterController");
const songController = require("../controllers/songController");

// --- FOR TESTING ---
router.get("/character/all", characterController.getAllCharacters);
router.get("/instrument/all", instrumentController.getAllInstruments);
router.get("/song/all", songController.getAllSongs);


// ---
router.get("/quest/all", questController.getAllQuests);
router.post("/quest", questController.createNewQuest);



module.exports = router;