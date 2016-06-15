'use strict';

var sera = require('./sera');
var chamou = require('./chamou');
var conselhos = require('./conselhos');
var evc = require('./e-vc');
var salvarTwitter = require('./salvar-twitter');
var buscape = require('./buscape');

module.exports = {
  attachAll: function(bot){
    sera.attach(bot);
    chamou.attach(bot);
    evc.attach(bot);
    conselhos.attach(bot);
    salvarTwitter.attach(bot);
    buscape.attach(bot);
  }
};
