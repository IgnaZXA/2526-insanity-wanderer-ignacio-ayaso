const express = require("express");
const router = express.Router();

const instrumentController = require('../controllers/instrumentController');

router.get("/", instrumentController.getAllInstruments);

module.exports = router;