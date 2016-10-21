/**
 * Created by Fran on 19/10/16.
 */

"use strict";

let express = require('express');
let router = express.Router();

let Tag = require('../../models/Tag');

router.get('/', function (req, res) {


    Tag(function (err, tags) {

        if (err){
            return err;
        }
        res.json({success: true, tags: tags});
    });

});

module.exports = router;
