/**
 * Created by Fran on 22/10/16.
 */

"use strict";

let acceptedLenguages = require('../config/local_config').languages;
let i18n = require('i18n');

i18n.configure({
   locales: acceptedLenguages
});

function errorHandler(err, req, res, sta) {
    
    let languages = req.query.lang || req.lang || 'en';
    
    i18n.setLocale(languages);
    err.message = i18n.__(err.message);
    
    console.log(err);
    
    res.status(sta).json({success: true, error: err.message});
}


module.exports = errorHandler;