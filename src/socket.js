// @ts-check
import { WebSocketServer } from 'ws'
import serverApp from './app.js'
import Collection from '@discordjs/collection'
import { actualState, setState } from './states.js'

/** @type {{name:string;token:string}[]} */
const tokens = `${process.env.TOKENS}`.split(',').map(token => ({
    name: token.trim().split(':')[0],
    token: token.trim().split(':')[1]
}))

const connections = new Collection()

// TODO: detect when the bot is offline

export default new WebSocketServer({ server: serverApp.server })
    .on('listening', () => {
        setInterval(async () => {
            let newState = ''
            const oldState = await actualState()
            const omts = connections.find((c, i) => i === 'omts')
            const ompy = connections.find((c, i) => i === 'ompy')

            if (omts)
                newState +=
                    '<:yes:885693508533489694> <:node:885693518239121418> El modulo de Node esta actualmente activo'
            else
                newState +=
                    '<:no:885693492632879104> <:node:885693518239121418> El modulo de Node ha sufrido una caída, Intentaremos restablecerlo en cuanto antes'
            if (ompy)
                newState +=
                    '<:yes:885693508533489694> <:python:885693511737950238> El modulo de Python esta actualmente activo'
            else
                newState +=
                    '<:no:885693492632879104> <:python:885693511737950238> El modulo de Python ha sufrido una caída, Intentaremos restablecerlo en cuanto antes'

            if (newState !== oldState) setState(newState)
        }, 300_000) // every 5 minutes
    })
    .on('connection', function (ws, req) {
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

        ws.on('close', () => {
            console.log(`Client ${req.socket?.remoteAddress} disconnected`)
            connections.delete(req.socket.remoteAddress)
        })
    })
