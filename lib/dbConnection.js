/**
 * Created by Fran on 19/10/16.
 */

"use strict";

let mongoose = require('mongoose');

let connection = mongoose.connection;

// Le digo a mongoose que use las promesas de node
mongoose.Promise = global.Promise;

// Si hay un error al conectarse lo muestro
connection.on('error', console.log.bind(console));

// Lo ejecuto una sola vez cuando se conecte a la base de datos
connection.once('open', function () {
    console.log('Connected to MongoDB');
});

// Establezco la conexion con MongoDB
mongoose.connect('mongodb://localhost:27017/nodepop');

