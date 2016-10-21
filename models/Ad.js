/**
 * Created by Fran on 19/10/16.
 */

"use strict";

let mongoose = require('mongoose');

// Creo el esquema del anuncio
let adSchema = mongoose.Schema({

    name: {type: String, required: true},
    sell: {type: Boolean, required: true},
    price: {type: Number, required: true},
    photo: String,
    tags: [String]

});

// Creo un listado con los filtros que se le pueden pasar
adSchema.statics.list = function (filter, sort, limit, skip, callback) {

    let query = Ad.find(filter);
    query.sort(sort);
    query.limit(limit);
    query.skip(skip);
    return query.exec(callback);
};

let Ad = mongoose.model('Ad', adSchema);