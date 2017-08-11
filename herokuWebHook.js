const TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const TelegramBot = require('node-telegram-bot-api');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const options = {
  webHook: {
    port: process.env.PORT
  },
  polling: true,
};

// "keyboard": [["last BTC price": 1], ["lowest": 2, "highest": 3]],

const url = process.env.APP_URL || '<URL>:443';
const bot = new TelegramBot(TOKEN, options);
const apiUrl = 'https://www.bitstamp.net/api/ticker/';

bot.setWebHook(`${url}/bot${TOKEN}`);

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Check the BTC price :D", {
  "reply_markup": {
    "keyboard": [["last"], ["low", "high"]],
    }
  });

});

const getData = async (option) => {
  try {
    const data = await fetch(apiUrl);
    const parsedData = await data.json();
    console.log(parsedData[option]);
    return parsedData[option];
  } catch (error) {
    console.log(error);
  }
}

bot.on('message', async (msg) => {

  const price = await getData(msg.text.toLowerCase());
  msg.text.toLowerCase() === 'last' || msg.text.toLowerCase() === 'high' || msg.text.toLowerCase() === 'low' ?
    bot.sendMessage(msg.chat.id, `<b>${msg.text.toLowerCase()}:</b> ${price} USD`) : null;

});
