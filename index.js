const fs = require('fs');
const Botkit = require('botkit');


const Config = require('./config.json');
const DB_FILE = 'db.json';


const controller = Botkit.slackbot({
    debug: false
});

const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : {};

function saveDB (cb) {
    fs.writeFile(DB_FILE, JSON.stringify(db), { encoding: 'utf8' }, cb);
}

controller.spawn({
    token: Config.SLACK_TOKEN
}).startRTM();

controller.on('direct_mention', (bot, message) => {
    const text = message.text;

    const matchData = text.match(/^set +([a-z]+) +(.+)$/);
    if (matchData) {
        const key = matchData[1];
        const word = matchData[2];
        db[key] = word;
        saveDB((err) => {
            if (err) {
                bot.reply(message, `Oh, fail to set word for "${key}".`);
            } else {
                bot.reply(message, `ok! I set word for "${key}".`);
            }
        });
    } else if (db[text]) {
        bot.api.chat.postMessage({
            username: bot.identity.name,
            text: db[text],
            channel: message.channel
        });
    } else {
        bot.reply(message, '?');
    }
});








