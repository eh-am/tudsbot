'use strict';

var TelegramBot = require('node-telegram-bot-api');
var TOKEN = '184870284:AAG_Jym5rdLhH4sp-0WatKjchGj-Dptp-9k';

module.exports = function(){
  var bot = new TelegramBot(TOKEN, { polling: true });

  bot.on('message', function(msg){
    bot.sendMessage(msg.from.id, 'Sim');
  });
}
