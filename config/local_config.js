/**
 * Created by Fran on 25/10/16.
 */

"use strict";

module.exports = {
    
    platform: ['ios', 'android'],
    languages: ['en', 'es'],
    
    mongoDir: 'mongodb://nodepopuser:gnS6EYsh4P4VySy3trCyYC59nmuzZYezsVqSXYGC@localhost:27017/nodepopdb',
    
    jwt: {
        secret: 'fspsefinds1235fdsfsacc14453tfdv34',
        options: {
            expiresIn: '2 days'
        }
    }
};
