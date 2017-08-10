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

const url = process.env.APP_URL || '<URL>:443';
const bot = new TelegramBot(TOKEN, options);

bot.setWebHook(`${url}/bot${TOKEN}`);

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
    "keyboard": [["x2", "x3"], ["Keyboard"], ["I'm robot"]],
    }
  });

});

const double = (value) => value * 2;

const triple = (value) => value * 3;

bot.on('message', (msg) => {
  const x2 = "x2";
  const x3 = "x3";
  if (msg.text.toLowerCase().indexOf(x2) === 0) {
    bot.sendMessage(msg.chat.id, "Enter a number to double").then(() => {
      bot.once('message', answer => {
        const res = answer.text;
        const result = double(parseInt(res));
        bot.sendMessage(msg.chat.id, result);
        return result;
      });
    });
  }

  if (msg.text.toLowerCase().indexOf(x3) === 0) {
    bot.sendMessage(msg.chat.id, "Enter a number to triple").then(() => {
      bot.once('message', answer => {
        const res = answer.text;
        const result = triple(parseInt(res));
        bot.sendMessage(msg.chat.id, result);
        return result;
      });
    });
  }
  const bye = "bye";
  if (msg.text.toLowerCase().includes(bye)) {
      bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }
  const robot = "I'm robot";
  if (msg.text.indexOf(robot) === 0) {
      bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");
  }
});
