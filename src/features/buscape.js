'use strict';

var escape = require('escape-html');

module.exports = {
  attach: function(b){
    var bot = b;

    bot.onText(new RegExp('tudsbot quanto custa (?:um|uma)+ (.*)', 'i'), (msg) => {
      var products = new RegExp('tudsbot quanto custa (?:um|uma)+ (.*)', 'i').exec(msg.text)[1];
      products = escape(products);

      var message = 'Vê ae \n' +
      getBuscapeURL(products) + '\n\n' +
      getMercadoLivreURL(products) + '\n';


      bot.sendMessage(msg.chat.id, message, {reply_to_message_id: msg.message_id });
    });
  }
};

function getBuscapeURL(product){
  return 'http://www.buscape.com.br/cprocura?fromSearchBox=true&produto=' + product;
}

function getMercadoLivreURL(product){
  return 'http://lista.mercadolivre.com.br/' + product;
}
