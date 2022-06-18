// @ts-check
import { WebSocketServer } from 'ws'
import serverApp from './app.js'

/** @type {{name:string;token:string}[]} */
const tokens = `${process.env.TOKENS}`.split(',').map(token => ({
    name: token.trim().split(':')[0],
    token: token.trim().split(':')[1]
}))

const connections = new Map()

// TODO: detect when the bot is offline

export default new WebSocketServer({ server: serverApp.server }).on('connection', function (ws, req) {
    console.log(`Client ${req.socket.remoteAddress} connected`)

    ws.on('message', message => {
        const hc = connections.has(req.socket.remoteAddress),
            t = tokens.find(token => token.token === message.toString())

        if (!hc && t) connections.set(req.socket.remoteAddress, t.name)
        else if (!hc) {
            ws.send("{event: 'error', message: 'You are not authorized to use this websocket'}")
            ws.close()
        } else
            this.clients.forEach(client => {
                if (client !== ws) client.send(message)
            })
    })

    ws.on('close', () => console.log(`Client ${req.socket?.remoteAddress} disconnected`))
})
