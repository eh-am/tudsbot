'use strict';

var Twitter = require('twitter');
var TelegramBot = require('node-telegram-bot-api');
var TOKEN = process.env.TELEGRAMTOKEN;
var validUrl = require('valid-url');
var https = require('https');

var TWITTER = {
  CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
  ACCESS_TOKEN_KEY: process.env.TWITTER_ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET
};


module.exports = function(){
  var bot = new TelegramBot(TOKEN, { polling: true });
  var twitterClient = new Twitter({
    consumer_key: TWITTER.CONSUMER_KEY,
    consumer_secret: TWITTER.CONSUMER_SECRET,
    access_token_key: TWITTER.ACCESS_TOKEN_KEY,
    access_token_secret: TWITTER.ACCESS_TOKEN_SECRET
  });

  // this regex is supposed to match positively if a string contails an url somewhere
  var regex = new RegExp('(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?');

  bot.on('message', function(msg){
    if (!regex.test(msg.text)) return;
    if (!new RegExp('tudsbot', 'i').test(msg.text)) return; // it has to contain 'tudsbot'

    msg.text.split(' ').forEach(function (word){
      // if it's a url
      if (validUrl.isUri(word)){
        if (msg.chat.type === "private"){
          bot.sendMessage(msg.chat.id, "Desculpe, só funciono em grupos");
          return ;
        }

        var message = 'Alguém mandou no chat "' + msg.chat.title + '" a seguinte mensagem: \n\n' + msg.text;

        https.get(word, function (res){
          twitterClient.post('statuses/update', { status: message }, function (err, tweet){
            if (err){
              bot.sendMessage(msg.chat.id, "Putz, deu alguma merda" + JSON.stringify(err), {reply_to_message_id: msg.message_id })
            }

            bot.sendMessage(msg.chat.id, "Opa, acabei de salvar esse link no http://www.twitter.com/tudsBot ", {reply_to_message_id: msg.message_id })
          });

        });

      }
    });
  });
}
