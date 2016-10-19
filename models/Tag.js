/**
 * Created by Fran on 19/10/16.
 */

"use strict";

var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({

    platform: {type: String, enum: ['ios', 'android'], required: true},
    tag: {type: String, required: true},
    user: String

});

mongoose.model('Tag', tagSchema);