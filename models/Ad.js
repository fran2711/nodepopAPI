/**
 * Created by Fran on 19/10/16.
 */

"use strict";

var mongoose = require('mongoose');

// Creo el esquema del anuncio
var anuncioSchema = mongoose.Schema({

    name: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String],

});

// Creo un listado con los filtros que se le pueden pasar
anuncioSchema.statics.list = function (filter, start, limit, sort, callback) {

    var query = Anuncio.find(filter);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);
    return query.exec(callback);
};

var Anuncio = mongoose.model('Anuncio', anuncioSchema);