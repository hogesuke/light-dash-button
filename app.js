const dash_button = require('node-dash-button');
const config = require('./config/config.json');
const io = require('socket.io-client');

const dash = dash_button('ac:63:be:14:b8:02', null, null, 'all');
const socket = io.connect(config.ws_server_url);

let isPowerOn = false;

dash.on('detected', () => {
  console.log(config.mac_address);
  socket.emit('power', isPowerOn ? 'power_off' : 'power_off');
});
