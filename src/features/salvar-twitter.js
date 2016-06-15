'use strict';

var alcunhas = require('../alcunhas').alcunhas;
var twitterClient = require('../twitter').client;
var validUrl = require('valid-url');
var https = require('http-https');

/*
* It's a reply and the message is 'tudsbot salvar quote'
*/


function deleteTweet(msg, bot){
    var deleteId = msg.text.match('tudsbot apagar (\\d+)', 'i')[1];

    twitterClient.post('statuses/destroy/' + deleteId, function (err, tweet){
      if (err){
        bot.sendMessage(msg.chat.id, "Putz, deu alguma merda" + JSON.stringify(err), {reply_to_message_id: msg.message_id })
      } else {
        bot.sendMessage(msg.chat.id, "Tweet apagado com sucesso, cuzão");
      }

    });
}



function saveQuote(msg, bot){
  if (msg.reply_to_message){

    // TODO
    // quebrar a mensagem em 2 tweets
    // if ()

    twitterClient.post('statuses/update', { status: msg.reply_to_message.text }, function (err, tweet){
      if (err){
        bot.sendMessage(msg.chat.id, "Putz, deu alguma merda" + JSON.stringify(err), {reply_to_message_id: msg.message_id })
      } else {
        bot.sendMessage(msg.chat.id, "Opa, acabei de salvar essa mensagem. Se quiser apagar manda um 'tudsbot apagar " + tweet.id_str + "'", {reply_to_message_id: msg.message_id })
      }

    });
  }
}


function saveLink(msg, bot){
  var testURL = new RegExp('(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?');

  msg.text.split(' ').forEach(function (word){
    // if it's a url
    if (testURL.test(word)){
      var message = msg.text;

      https.get(word, function (res){
        twitterClient.post('statuses/update', { status: message }, function (err, tweet){
          if (err){
            bot.sendMessage(msg.chat.id, "Putz, deu alguma merda" + JSON.stringify(err), {reply_to_message_id: msg.message_id })
          } else {
            bot.sendMessage(msg.chat.id, "Opa, acabei de salvar esse link. Se quiser apagar manda um 'tudsbot apagar" + tweet.id_str + "'", {reply_to_message_id: msg.message_id })  
          }
        });

      }).on('error', function(e){
          bot.sendMessage(msg.chat.id, "Putz, deu alguma merda" + JSON.stringify(e), {reply_to_message_id: msg.message_id });
      });
    }
  });

}



module.exports = {
  attach: function(b){
    var bot = b;

    bot.onText(new RegExp('tudsbot apagar \\d+', 'i'), msg => deleteTweet(msg, bot));
    bot.onText(new RegExp('^(' + alcunhas.join('|') + ') salvar quote', 'i'), msg => saveQuote(msg, bot));
    bot.onText(new RegExp('tudsbot salvar', 'i'), msg => saveLink(msg, bot));
  }
};
