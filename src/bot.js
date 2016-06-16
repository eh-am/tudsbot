'use strict';

var TelegramBot = require('node-telegram-bot-api');
var TOKEN = process.env.TELEGRAMTOKEN;
var features = require('./features/main');
var args = require('yargs').argv;
var ENV = args.env || 'prod';

var doPolling = ENV === 'dev' ? false : true;

module.exports = function(){
  var bot = new TelegramBot(TOKEN, { polling: doPolling });
  // var bot = new TelegramBot(TOKEN);

  features.attachAll(bot);

  bot.on('message', function(msg){
    console.log('recebi mensagem');
  });
};
