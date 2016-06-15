'use strict';

var Twitter = require('twitter');

var TWITTER = {
  CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
  ACCESS_TOKEN_KEY: process.env.TWITTER_ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

var client = new Twitter({
  consumer_key: TWITTER.CONSUMER_KEY,
  consumer_secret: TWITTER.CONSUMER_SECRET,
  access_token_key: TWITTER.ACCESS_TOKEN_KEY,
  access_token_secret: TWITTER.ACCESS_TOKEN_SECRET
});


module.exports = {
  client: client
}
