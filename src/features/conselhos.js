'use strict';

var _ = require('lodash');
/*
* Advices
* tudsbot devo
* tudsbot x deve
* tudsbot o x deve
*/

module.exports = {
  attach: function(b){
    var bot = b;

    bot.onText(new RegExp(`tudsbot devo`, 'i'), magicConchShell);
    bot.onText(new RegExp(`tudsbot o? (${pessoas.join('|')}) deve`, 'i'), magicConchShell);
  }
};


function magicConchShell(msg){
  let randomNum = _.random(0, 10);

  if (randomNum % 5 === 0){
    bot.sendMessage(msg.chat.id, "Tenho cara de Oráculo de Delfos por acaso?", {reply_to_message_id: msg.message_id })
  } else if (isEven(randomNum))
    bot.sendMessage(msg.chat.id, "Deve", {reply_to_message_id: msg.message_id })
  else
    bot.sendMessage(msg.chat.id, "Não deve", {reply_to_message_id: msg.message_id })
}
