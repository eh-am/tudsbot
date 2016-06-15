'use strict';

var _ = require('lodash');
var membros = require('../membros').membros;


/*
* Advices
* tudsbot devo
* tudsbot x deve
* tudsbot o x deve
*/
module.exports = {
  attach: function(b){
    var bot = b;

    bot.onText(new RegExp(`tudsbot devo`, 'i'), msg => magicConchShell(msg, bot));
    bot.onText(new RegExp(`tudsbot o? (${membros.join('|')}) deve`, 'i'), msg => magicConchShell(msg, bot));
  }
};


function magicConchShell(msg, bot){
  let randomNum = _.random(0, 12);

  if (randomNum >= 10){
    bot.sendMessage(msg.chat.id, "Tenho cara de Oráculo de Delfos por acaso?", {reply_to_message_id: msg.message_id })
  } else if (isEven(randomNum))
    bot.sendMessage(msg.chat.id, "Deve", {reply_to_message_id: msg.message_id })
  else
    bot.sendMessage(msg.chat.id, "Não deve", {reply_to_message_id: msg.message_id })
}

function isEven(value){
  return (value % 2 === 0);
}
