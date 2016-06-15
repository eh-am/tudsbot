'use strict';

var membros = require('../membros.json').membros;
/*
* E vc?
*/
module.exports = {
  attach: function(b){
    var bot = b;

    bot.onText(new RegExp('e (vc|voce|você) tudsbot', 'i'), msg => {
      bot.sendMessage(msg.chat.id, "E vc " + _.shuffle(membros)[0] + "?");
    });
  }
};
