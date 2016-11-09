/**
 * Created by Fran on 20/10/16.
 */


"use strict";

let client = require('mongodb').MongoClient;
let fs = require('fs');
let mongoDir = require('../config/local_config').mongoDir;

function install() {
    
    
    console.log('Executing installation');
    
    client.connect(mongoDir, function (err, db) {
        
        if (err){
            return err;
        }
        
        console.log('Connected to database');
        
        console.log('Starting deleting database ---------------');
        console.log('Deleting advertisements collection');
        
        db.collection('advertisements').remove(function (err, status) {
            if (err) {
                console.log('Error deleting advertisements collection');
            }
            console.log('Advertisements collection deleted. Status: ' + status);
            
            
            console.log('Deleting users collection');
            db.collection('users').remove(function (err, status) {
                if (err) {
                    console.log('Error deleting users collection');
                }
                console.log('Users collection deleted. Status: ' + status);
                
                
                console.log('Deleting tokens collection');
                db.collection('tokens').remove(function (err, status) {
                    if (err) {
                        console.log('Error deleting tokens collection');
                    }
                    console.log('Tokens collection deleted. Status: ' + status);
                    
                    console.log('Finished deleting database ---------------');
                    
                    insertData(db);
                });
            });
        });
    });
}

function insertData(db) {
    
    let json;
    
    fs.readFile(__dirname + '/commercials.json', 'utf8', function (err, data, next) {
        if (err){
            return err;
        }
        console.log('Commercials loaded');
        
        json = JSON.parse(data);
        
        console.log('Adding commercials');
        db.collection('Commercials').insert(json).then(function () {
            console.log('Commercials added');
        }).catch(next);
    });
    
    fs.readFile(__dirname + '/user.json', 'utf8', function (err, data, next) {
        if (err){
            return err;
        }
        console.log('Users loaded');
        
        json = JSON.parse(data);
        
        console.log('Adding users');
        db.collection('users').insert(json).then(function () {
            console.log('Users added');
        }).catch(next);
    });
    
}

install();
