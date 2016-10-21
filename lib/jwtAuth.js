/**
 * Created by Fran on 21/10/16.
 */

"use strict";
let jwt = require('jsonwebtoken');
let configJWT = require('../config/local_config').jwt;

module.exports = function () {
    return function (req, res, next) {

        // Check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // Decode the token
        if (token) {

            jwt.verify(token, configJWT.secret, function (err, decoded) {
                if (err) {
                    return res.json({ok: false, error: {code: 401, message: 'Failed to authenticate token'}});
                } else {
                    req.decoded = decoded;
                    console.log('decoded', decoded);
                    next();
                }
            });
        } else {

            // If there is no token return error
            return res.status(403).json({
                ok: false,
                error: {code: 403, message: 'No token provided'}
            });
        }
    };

};