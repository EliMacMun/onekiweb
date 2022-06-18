export default await fetch('https://discordapp.com/api/v9/users/@me', {
    headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`
    }
}).then(res => res.json())
