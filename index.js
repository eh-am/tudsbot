'use strict';

var express = require('express');
var app = express();
var port = (process.env.PORT || 3000);

require('./bot.js')();

app.get('/', function(req, res){
  res.status(200);
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({name: 'tudsbot', ver: '0.0.1'}));
});

app.get('wakemydyno.txt', function(req, res){
  res.status(200);
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({name: 'tudsbot', ver: '0.0.1'}));
});

app.listen(port, function(){
  console.log('Listening on port ' + port);
});
