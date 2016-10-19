/**
 * Created by Fran on 19/10/16.
 */

"use strict";


var mongoose = require('mongoose');

var connection = mongoose.connection;

// Si hay un error al conectarse lo muestro
connection.on('error', console.log.bind(console));

// Lo ejecuto una sola vez cuando se conecte a la base de datos
connection.once('open', function () {
    console.log('Connected to MongoDB');
});

// Establezco la conexion con MongoDB
mongoose.connect('mongodb://localhost:27017/nodepop');

