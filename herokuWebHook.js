const TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const TelegramBot = require('node-telegram-bot-api');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const options = {
  webHook: {
    port: process.env.PORT
  }
};

const url = process.env.APP_URL || '<URL>:443';
const bot = new TelegramBot(TOKEN, options);

bot.setWebHook(`${url}/bot${TOKEN}`);

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
      "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
      }
  });

});

bot.on('message', (msg) => {
  const Hi = "hi";
  if (msg.text.toLowerCase().indexOf(Hi) === 0) {
      bot.sendMessage(msg.chat.id, "Hello dear user");
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
