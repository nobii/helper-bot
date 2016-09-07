const Botkit = require('botkit');

const Config = require('./config.json');

const controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: Config.SLACK_TOKEN
}).startRTM();

controller.hears('hello', ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
    bot.reply(message, 'Hello yourself.');
});
