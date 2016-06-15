'use strict';

/*
* Reinforces the "Será?""
*/
module.exports = {
  attach: function(b){
    var bot = b;

    bot.onText(new RegExp('(será|sera)', 'i'), function(msg){
      bot.sendMessage(msg.chat.id, "Será?", {reply_to_message_id: msg.message_id })
    });
  }
};
