'use strict';

var Twitter = require('twitter');
var TelegramBot = require('node-telegram-bot-api');
var TOKEN = process.env.TELEGRAMTOKEN;
var validUrl = require('valid-url');
var http = require('http');

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
  var regex = '(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?';

  bot.onText(regex, function(msg){
    msg.text.split(' ').forEach(function (word){
      // if it's a url
      if (validUrl.isValid(word)){
        if (msg.chat.type === "private"){
          bot.sendMessage(msg.chat.id, "Desculpe, só funciono em grupos");
          return ;
        }

        http.get(word, function (res){
            console.log('url ' + word + ' exists');
            bot.sendMessage(msg.chat.id, "Url " + word + "exists");
        });

      }
    });
  });
}
