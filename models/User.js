/**
 * Created by Fran on 19/10/16.
 */

"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    name: String,
    email: String,
    password: String

});

let User = mongoose.model('User', userSchema);