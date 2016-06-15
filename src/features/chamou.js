'use strict';

var alcunhas = require('../alcunhas').alcunhas;

/**
* Responds to its nicknames
* Used to test if the bot is running correctly
*/
module.exports = {
  attach: function(b){
    var bot = b;

    bot.onText(new RegExp(`^(${alcunhas.join('|')})$`, 'i'), (msg) => {
      bot.sendMessage(msg.chat.id, "Chamou?", {reply_to_message_id: msg.message_id });
    });
  }
};
