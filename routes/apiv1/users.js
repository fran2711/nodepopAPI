/**
 * Created by Fran on 19/10/16.
 */

"use strict";

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let jwtAuth = require('../../lib/jwtAuth');
let sha = require('sha256');


let User = mongoose.model('User');

router.post('/authenticate', function (req, res) {

    if (!req.body.email || !req.body.password) {
        return error(new Error(''));
    }

    let email = req.body.email;
    let password = req.body.password;


    User.findOne({email: email}, function (err, usuario) {

    });


});


module.exports = router;