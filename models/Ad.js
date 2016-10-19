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
anuncioSchema.statics.list = function (filter, sort, limit, skip, callback) {

    var query = Anuncio.find(filter);
    query.sort(sort);
    query.limit(limit);
    query.skip(skip);
    return query.exec(callback);
};

var Anuncio = mongoose.model('Anuncio', anuncioSchema);