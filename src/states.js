import { config } from 'dotenv'

config()

export async function actualState() {
    const r = await fetch('https://discord.com/api/v10/channels/885726489029521468/messages?limit=1', {
        headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` }
    })
        .then(res => res.json())
        .catch(console.error)
    return r[0]?.content
}

export async function setState(state) {
    const message = await fetch('https://discord.com/api/v10/channels/885726489029521468/messages', {
        method: 'POST',
        headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
        body: JSON.stringify({ content: state })
    })
        .then(res => res.json())
        .catch(console.error)
}
