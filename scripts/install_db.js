/**
 * Created by Fran on 20/10/16.
 */

"use strict";

let client = require('mongodb').MongoClient;
let fs = require('fs');

function install() {
    console.log('Installing database');
    
    client.connect('mongodb://localhost:27017/nodepop', function (err, db) {
       
        if (err) throw err;
        console.log('Connected to Database');
        
        console.log('Starting deletion -----------------------');
        console.log('Deleting advertisement collection');
        db.collection('ads').drop(function (err, status) {
    
            if (err) {
                console.log('Error deleting advertisement collection');
            }
            console.log('Advertisement collection deleted. Status:' + status);
    
            console.log('Deleting users collection')
            db.collection('users').drop(function (err, status) {
                if (err) {
                    console.log('Error deleting user collection');
                }
                console.log('User collection deleted. Status:' + status);
        
        
                console.log('Deleting tokens collection');
                db.collection('tokens').drop(function (err, status) {
            
                    if (err) {
                        console.log('Error deleting tokens collection');
                    }
                    console.log('Tokens collection deleted. Status:' + status);
            
            
                    console.log('Starting insertion -----------------------');
            
                    insertData(db);
            
                });
        
            });
    
        });
        
    });
}


function insertData(db) {
    
    fs.readFile(__dirname + 'advertisements.json', 'utf8', function (err, data) {
       
        if (err) throw err;
        console.log('Advertisements loaded');
        
        let json = JSON.parse(data);
        
        db.collection('advertisements').insert(json, function (err) {
            if (err) throw err;
            console.log('Advertisements added');
        });
        
    });
    
    fs.readFile(__dirname + 'user.json', 'utf8', function (err, data) {
    
        if (err) throw err;
        console.log('Users loaded');
    
        let json = JSON.parse(data);
    
        db.collection('user').insert(json, function (err) {
            if (err) throw err;
            console.log('Users added');
        });
    
    });
}


install();