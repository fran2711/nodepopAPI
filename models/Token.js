/**
 * Created by Fran on 20/10/16.
 */

"use strict";

var mongoose = require('mongoose');
var platforms = require('../config/local_config').platform;

var tokenSchema = mongoose.Schema({

    platform: {type: String, enum: platforms, required: true},
    token: {type: String, required: true},
    user: {type: String, required: true}

});

var Token = mongoose.model('Token', tokenSchema);