/**
 * Created by Fran on 21/10/16.
 */

"use strict";

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Token = mongoose.model('Token');
let platforms = require('../../config/local_config').platform;
let errorHandler = require('../../lib/errorHandler');

router.post('/', function (req, res) {
    
    let token = new Token(req.body);
    let error = new Error();
    
    token.save(function (err, saved) {
       
        if (err){
            
            error.message = 'token';
            error.lenguage = req.lang;
            error.status = 500;
            errorHandler(error, res);
            return;
        }
        res.json({success: true, saved: saved});
    });
});


router.put('/', function (req, res) {
    let token = new Token(req.body);
    let error = new Error();
    
    token.save(function (err, saved) {
    
        if (err){
        
            error.message = 'token';
            error.lenguage = req.lang;
            error.status = 500;
            errorHandler(error, res);
            return;
        }
        res.json({success: true, saved: saved});
    });
});

module.exports = router;