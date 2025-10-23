
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const mongodbRoute = 'mongodb+srv://ignacio:igna_0000@cluster0.a2mlm48.mongodb.net/TheMoorlanWardener?retryWrites=true&w=majority';

const instrumentRouter = require('./routes/instrumentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/Instruments", instrumentRouter);
    
async function start() {
    try{
        await mongoose.connect(mongodbRoute);
        app.listen(PORT, () => {
            console.log(`API is listening on port ${PORT}`);
        });
        console.log('Conexión con Mongo correcta.');
    }catch(error){
        console.log(`Error al conectar con la base de datos: ${error.message}`);
    }
}

start();
