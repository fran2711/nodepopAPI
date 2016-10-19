/**
 * Created by Fran on 19/10/16.
 */

"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');

router.post('/', function (req, res, next) {

    var user = new User(req.body);

    user.save(function (err, userSaved) {
       if (err){
           return next(err);
       }

       res.json({success: true, user: userSaved});
    });

});


module.exports = router;