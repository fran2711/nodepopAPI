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
let config = require('../../config/local_config');
let errorHandler = require('../../lib/errorHandler');
let emailValidator = require('email-validator');

// Authentication of user
router.post('/authenticate', function (req, res) {

    let email = req.body.email;
    let password = req.body.password;
    
    password = sha(password);

    User.findOne({email: email}, function (err, user) {
        
        
        if (err){
            return errorHandler(new Error('server'),req, res, 500);
        }

        if (!email){
            return errorHandler(new Error('email'), req, res, 401);
        }

        // Authentication
        if (password !== user.password){
            return errorHandler(new Error('pass'), req, res, 401);
        }

        let token = jwt.sign({id: user._id},
            config.jwt.secret,
            {expiresIn: '2 days'});

        res.json({success: true, token: token});
    });
});


router.get('/authenticate', jwtAuth(), function (req, res) {

    res.json({
        success: true,
        message: 'User authenticated with token'
    });

});

// Adding and saving a new user
router.post('/register', function (req, res) {

    let user = new User();
    
    if (!user.name || !user.email || !user.password){
        return errorHandler(new Error('user'), req, res, 400);
    }
    
    if (!emailValidator.validate(user.email)){
        return errorHandler(new Error('email_invalid'), req, res, 400);
    }
    
    user({
        name: req.body.name,
        email: req.body.email,
        password: sha(req.body.password)
    });
    
    
    user.save(function (err, saved) {

        if (err){
            return error;
        }

        console.log(saved);
        res.json({success: true, message: saved});

    });
});



module.exports = router;