const TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const TelegramBot = require('node-telegram-bot-api');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const options = {
  webHook: {
    port: process.env.PORT
  },
};

const url = process.env.APP_URL || '<URL>:443';
const bot = new TelegramBot(TOKEN, options);

bot.setWebHook(`${url}/bot${TOKEN}`);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
    "keyboard": [["x2", "x3"]],
    }
  });
});

const double = (value) => value * 2;

const triple = (value) => value * 3;

bot.on('message', (msg) => {

  switch (msg.text.toLowerCase()) {
    case 'x2':
      bot.sendMessage(msg.chat.id, "Enter a number to double").then(() => {
        bot.once('message', answer => {
          const res = answer.text;
          const result = double(parseInt(res));
          bot.sendMessage(msg.chat.id, result);
          return result;
        });
      });
      break;
    case 'x3':
      bot.sendMessage(msg.chat.id, "Enter a number to triple").then(() => {
        bot.once('message', answer => {
          const res = answer.text;
          const result = triple(parseInt(res));
          bot.sendMessage(msg.chat.id, result);
          return result;
        });
      });
    default:
      bot.sendMessage(msg.chat.id, "Invalid command, please try again");
  }

});
