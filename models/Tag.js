/**
 * Created by Fran on 19/10/16.
 */

"use strict";

var tags = require('../config/local_config').tags;

var listTags = function (callback) {
  callback(null, tags);
};

module.exports = listTags;