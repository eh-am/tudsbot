'use strict';

var sera = require('./sera');
var chamou = require('./chamou');
var conselhos = require('./conselhos');
var evc = require('./e-vc');

module.exports = {
  attachAll: function(bot){
    sera.attach(bot);
    chamou.attach(bot);
    evc.attach(bot);
    conselhos.attach(bot);
  }
};
