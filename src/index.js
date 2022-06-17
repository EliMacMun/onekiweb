// @ts-check
import socketServer from './socket.js'
import notifier, { configYTNotifier } from './youtube.js'
import serverApp from './app.js'

global.bot = await fetch('https://discordapp.com/api/v9/users/@me', {
    headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`
    }
}).then(res => res.json())

//server
const { server, app } = serverApp()

//socket
const socket = socketServer(server)

//youtube
configYTNotifier(notifier, socket)

//routes
import('./routes/web.js').then(web => {
    app.use('/', web.default)
})

import('./routes/api.js').then(api => {
    app.use('/api', api.default)
})
