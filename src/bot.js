const { Client } = require('discord.js');
require('dotenv').config();
const client = new Client({       
    intents: []
});

client.login(process.env.TOKEN_DISCORD);

client.on('ready', () => {
    console.log('Bot Encendido');
})

module.exports = client;