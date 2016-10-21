/**
 * Created by Fran on 20/10/16.
 */

"use strict";

var async = require('async');

// Hash
var sha = require('sha256');

// Database connection
var mongoose = require('mongoose');
require('../lib/dbConnection');
var conn = mongoose.connection;

// Models
require('../models/Ad');
require('../models/User');
require('../models/Token');

// Entities
var Ad = mongoose.model('Ad');
var User = mongoose.model('User');
var Token = mongoose.model('User');

// Files
var fs = require('fs');
var path = require('path');
var adsFile = path.join('scripts', 'advertisements.json');

async.series([

    function (callback) {
        Ad.remove({}, function (err) {

            console.log('Removing Ads table....');

            if (err){
                console.log('Error removing Ads table: ', err);
                return callback(err);
            }
            console.log('Done removing Ads table');
            callback(null, 'removeAds');
        });
    },

    function (callback) {
        User.remove({}, function (err) {
            console.log('Removing User table....');

            if (err){
                console.log('Error removing Users table: ', err);
                return callback(err);
            }
            console.log('Done removing Users table');
            callback(null, 'removeUsers');

        });
    },

    function (callback) {
        Token.remove({}, function (err) {
           console.log('Removing Token table....');

            if (err){
                console.log('Error removing Token table: ', err);
                return callback(err);
            }
            console.log('Done removing Token table');
            callback(null, 'removeTokens');

        });
    },


    function (callback) {
        fs.readFile(adsFile, {enconding: 'utf8'}, function (err, data) {

            if (err){
                return callback(err);
            }

            data = JSON.parse(data);

            async.each(data.ads, function (item) {
               new Ad(item).save(function (err, newAd) {
                   if (err){
                       console.log('Error creating new Ad', err);
                       return callback(err);
                   }
                   console.log('Ad '+ newAd.name + ' created');
               });
            });
            callback(null, 'addedAdvertisement');
        });
    },

    function (callback) {
        fs.readFile(usersFile, {enconding: 'utf8'},function (err, data) {
            if (err){
                return callback(err);
            }

            data = JSON.parse(data);

            async.each(data.users, function (user) {
                new User(user).save(function (err, newUser) {
                    if (err){
                        console.log('Error creating new User', err);
                        return callback(err);
                    }
                    console.log('User '+ newUser.name + ' created');
                });
            });
            callback(null, 'addedUser');
        });
    }
],
    function (err, results) {
        if (err){
            console.log('Error while installing database: ', err);
            return;
        }

        console.log(results);
        conn.close();
        console.log('Finished the installation of NodePop database');
    }
);

