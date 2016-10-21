/**
 * Created by Fran on 19/10/16.
 */

"use strict";

let tags = require('../config/local_config').tags;

let listTags = function (callback) {
  callback(null, tags);
};

module.exports = listTags;