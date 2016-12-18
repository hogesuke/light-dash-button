"use strict";

const dash_button = require('node-dash-button');
const config = require('./config/config.json');
const WebSocketClient = require('websocket').client;

const dash = dash_button('ac:63:be:14:b8:02', null, null, 'all');
const sw_client = new WebSocketClient();

let isPowerUp = false;

sw_client.on('connectFailed', function(error) {
  console.log('Connection failure: ' + error.toString());
});

sw_client.on('connect', (con) => {
  console.log('Connection Success!');

  con.on('message', (message) => {
    if (message.utf8Data === 'power_on') {
      console.log('Successful Power On');
      isPowerUp = true;
    }
    if (message.utf8Data === 'power_off') {
      console.log('Successful Power Off');
      isPowerUp = false;
    }
  });

  dash.on('detected', () => {
    con.send(isPowerUp ? 'power_off' : 'power_on');
  });
});

sw_client.connect(config.ws_server_url);
