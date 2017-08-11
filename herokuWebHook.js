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

  bot.sendMessage(msg.chat.id, "Welcome", {
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

bot.on('message', (msg) => {

  const price = getData(msg.text.toLowerCase());
  bot.sendMessage(msg.chat.id, `${msg.text.toLowerCase()}: ${price}`);

  // switch (msg.text.toLowerCase()) {
  //   case 'last':
  //     const price = getData();
  //     bot.sendMessage(msg.chat.id, `Last BTC price: ${price}`)
  //     // .then(() => {
  //     //   bot.once('message', answer => {
  //     //     const res = answer.text;
  //     //     const result = double(parseInt(res));
  //     //     bot.sendMessage(msg.chat.id, result);
  //     //     return result;
  //     //   });
  //     // });
  //     break;
  //   case 2:
  //     bot.sendMessage(msg.chat.id, "Enter a number to triple")
  //     // .then(() => {
  //     //   bot.once('message', answer => {
  //     //     const res = answer.text;
  //     //     const result = triple(parseInt(res));
  //     //     bot.sendMessage(msg.chat.id, result);
  //     //     return result;
  //     //   });
  //     // });
  //   default:
  //     bot.sendMessage(msg.chat.id, "Invalid command, please try again");
  // }

});
