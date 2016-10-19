/**
 * Created by Fran on 19/10/16.
 */

"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');

router.get('/', function (req, res) {

    var tag = new Tag(req.body);

    tag.save(function (err, tags) {

        if (err){
            return console.log(err);
        }
        res.json({success: true, rows: tags});

    });

});

module.exports = router;
