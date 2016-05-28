'use strict';

var TelegramBot = require('node-telegram-bot-api');
var TOKEN = process.env.TELEGRAMTOKEN;

module.exports = function(){
  var bot = new TelegramBot(TOKEN, { polling: true });

  bot.on('message', function(msg){
    bot.sendMessage(msg.from.id, 'Sim');
  });
}
