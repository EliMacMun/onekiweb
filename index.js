const express = require('express')
const next = require('next')
const { Server } = require('ws')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const app = express()

    app.all('*', (req, res) => {
        return handle(req, res)
    })

    const server = app.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })

    const wss = new Server({ server })

    wss.on('connection', (ws, req) => {
        const location = url.parse(req.url, true)

        console.log(
            `Client ${req.socket?.remoteAddress}/${req.headers['x-forwarded-for']
                .split(',')[0]
                .trim()} connected\nLocation: ${location.href}}`
        )

        ws.on('message', message => {
            console.log('received: %s', message)
            wss.clients.forEach(client => {
                if (client !== ws) client.send(message)
            })
            ws.on('close', wsc => console.log('Client disconnected', req.socket?.remoteAddress))
        })
    })
})
