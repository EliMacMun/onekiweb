// // noinspection NodeCoreCodingAssistance,JSCheckFunctionSignatures
import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import YouTubeNotifier from 'youtube-notification'
import eejsl from 'express-ejs-layouts'
import session from 'express-session'   
import { web } from './routes/web.js'
import { api } from './routes/api.js'
import { join, resolve } from 'path'
import flash from 'connect-flash'
import { config } from 'dotenv'
import passport from 'passport'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Socket from 'ws'

config()
const app = express()

/** @type import('firebase-admin/firestore').Firestore */
global.db = getFirestore(initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_TOKEN)) }))

global.bot = await fetch('https://discordapp.com/api/v6/users/@me', {
    headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`
    }
}).then(res => res.json())
//express settings
app.set('port', process.env.PORT || 3000)
app.set('views', join(resolve(process.cwd()), 'src', 'views'))
app.set('view engine', 'ejs')
app.use(eejsl)
app.set('layout', 'layouts/layout')

// const morgan = require("morgan");

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(resolve(process.cwd()), 'src', 'public')))

const server = app.listen(app.get('port'), () => {
    console.log(`listen on http://localhost:${app.get('port')}`)
})

//routes
app.use('/', web)
app.use("/api", api)

app.use(flash())
app.use(session({
    secret: "thisIsASecretShhh",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

//socket
const socket = new Socket.Server({ server })
socket.on('connection', (ws, req) => {
    console.log(`Client ${req.socket?.remoteAddress}/${req.headers['x-forwarded-for'].split(',')[0].trim()} connected`)
    ws.on('message', message => socket.clients.forEach(client => {
        if (client !== ws) client.send(message)
    }))
    socket.on('close', () => console.log(`Client ${req.socket?.remoteAddress}/${req.headers['x-forwarded-for'].split(',')[0].trim()} disconnected`))
})

//youtube
global.notifier = new YouTubeNotifier({
    hubCallback: 'https://oneki.herokuapp.com/api/notifications/youtube/',
    secret: 'IDK'
});

notifier.on('notified', data => {
    db.collection('notifications').doc('youtube').get().then(snap => {
        if(snap.exists) {
            snap.data()[data.channel.id].map(id => {
                wss.clients.forEach((client) => {
                    client.send(JSON.stringify({
                        event: 'new_yt_video',
                        server: id,
                        value: data
                    }));
                });
            })
        }
    })
    wss.clients.forEach((client) => {
        client.send(JSON.stringify({
            event: 'new_yt_video',
            value: data
        }));
    });
});

notifier.subscribe('UCiVty0vnYbswLGhmWTp6FPA')