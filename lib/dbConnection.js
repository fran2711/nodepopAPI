/**
 * Created by Fran on 25/10/16.
 */

"use strict";

let mongoDir = require('../config/local_config').mongoDir;

let mongosee = require ('mongoose');
let db = mongosee.connection;

mongosee.Promise = global.Promise;

db.on('error', console.log.bind(console));

db.once('open', function () {
    console.log('Connected to MongoDB');
});

mongosee.connect(mongoDir);

module.exports = db;
