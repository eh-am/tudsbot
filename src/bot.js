'use strict';

var TelegramBot = require('node-telegram-bot-api');
var TOKEN = process.env.TELEGRAMTOKEN;
var features = require('./features/main');

module.exports = function(){
  var bot = new TelegramBot(TOKEN, { polling: true });

  features.attachAll(bot);
  
};
