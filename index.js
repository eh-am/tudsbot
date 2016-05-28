'use strict';

var express = require('express');
var app = express();
var port = (process.env.PORT || 3000);

app.get('/', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({'hello': 'world'}));
});

app.listen(port, function(){
  console.log('Listening on port ' + port);
});
