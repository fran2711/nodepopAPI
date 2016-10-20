/**
 * Created by Fran on 19/10/16.
 */

"use strict";

var express = require('express');
var router = express.Router();

var Tag = require('../../models/Tag');

router.get('/', function (req, res) {


    Tag(function (err, tags) {

        if (err){
            return err;
        }
        res.json({success: true, tags: tags});
    });

});

module.exports = router;
