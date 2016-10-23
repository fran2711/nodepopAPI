"use strict";

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');


let app = express();

require('./lib/dbConnection');

// Load the models
require('./models/User');
require('./models/Ad');
require('./models/Token');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.use('/', require('./routes/index'));

// API routes
app.use('/apiv1/users', require('./routes/apiv1/users'));
app.use('/apiv1/tokens', require('./routes/apiv1/tokens'));
app.use('/apiv1/tokens', require('./routes/apiv1/ads'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        
        // si es una petición de API devolvemos JSON, sino una página
        if (isAPI(req)) {
            res.json({success: false, error: err});
        } else {
            res.render('error', {
                message: err.message,
                error: err
            });
        }
        
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    
    // si es una petición de API devolvemos JSON, sino una página
    if (isAPI(req)) {
        res.json({success: false, error: err});
    } else {
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
    
});


function isAPI(req) {
    return req.originalUrl.indexOf('/api') === 0;
}


module.exports = app;
