'use strict';

var sera = require('./sera');
var chamou = require('./chamou');
var conselhos = require('./conselhos');

module.exports = {
  attachAll: function(bot){
    sera.attach(bot);
    chamou.attach(bot);
  }
};
