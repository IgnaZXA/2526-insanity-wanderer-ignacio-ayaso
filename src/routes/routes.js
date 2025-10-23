const express = require("express");
const router = express.Router();

const instrumentController = require('../controllers/instrumentController');
const questController = require('../controllers/questController');

router.get("/instrument/all", instrumentController.getAllInstruments);
router.get("/quest/all", questController.getAllQuests);


module.exports = router;