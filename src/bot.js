const { Client } = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();
const client = new Client({       
    intents: []
});

(async ()=>{
    client.usuario = (await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bot ${process.env.TOKEN_DISCORD}`,
        },
    })).json();
})();

// fetch('https://discord.com/api/users/@me', {
//     headers: {
//         authorization: `Bot ${process.env.TOKEN_DISCORD}`,
//     },
// }).then(result => result.json()).then(response => {
//     client.usuario = response;
// })

client.login(process.env.TOKEN_DISCORD);

client.on('ready', () => {
    console.log('Bot Encendido');
})

module.exports = client;