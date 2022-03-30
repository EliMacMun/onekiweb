// // noinspection NodeCoreCodingAssistance,JSCheckFunctionSignatures
import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import eejsl from 'express-ejs-layouts'
import { web } from './routes/web.js'
import { join, resolve } from 'path'
import { config } from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { api } from './routes/api.js'

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
// const passport = require("./passport");
// const session = require("express-session");
// const YouTubeNotifier = require('youtube-notification');
// const { WebhookClient } = require('discord.js');

// //settings

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(resolve(process.cwd()), 'src', 'public')))

const server = app.listen(app.get('port'), () => {
    console.log(`listen on http://localhost:${app.get('port')}`)
})
// app.use(flash());
// app.use(
//     session({
//         secret: "loggindiscord",
//         resave: false,
//         saveUninitialized: false,
//     })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// //socket
// const { Server } = require('ws');
// const wss = new Server({ server });
// wss.on('connection', (ws, req) => {
//     console.log(`Client ${req.socket?.remoteAddress}/${req.headers['x-forwarded-for'].split(',')[0].trim()} connected`);
//     ws.on('message', (msg) => wss.clients.forEach((client) => {
//         if (client !== ws) client.send(msg);
//     }))
//     ws.on('close', () => console.log('Client disconnected'));
// });
// // const socketIO = require('socket.io')
// // const io = socketIO(server);
// // io.on('connection', (socket) => {
// //     console.log('Client connected');
// //     socket.onAny((event, ...args) => {
// //         console.log(event, args);
// //         io.emit(event, args);
// //       });
// //     socket.on('disconnect', () => console.log('Client disconnected'));
// // });

// //youtube
// notifier = new YouTubeNotifier({
//     hubCallback: 'https://oneki.herokuapp.com/api/notifications/youtube/',
//     secret: 'IDK'
// });

// notifier.on('notified', data => {
//     db.collection('notifications').doc('youtube').get().then(snap => {
//         if(snap.exists) {
//             snap.data()[data.channel.id].map(id => {
//                 wss.clients.forEach((client) => {
//                     client.send(JSON.stringify({
//                         event: 'new_yt_video',
//                         server: id,
//                         value: data
//                     }));
//                 });
//             })
//         }
//     })
//     wss.clients.forEach((client) => {
//         client.send(JSON.stringify({
//             event: 'new_yt_video',
//             value: data
//         }));
//     });
//     // console.log(`**${data.channel.name}** just uploaded a new video - **${data.video.link}**`);
//     // client.channels.cache.get(SERVER_CHANNEL_ID).send(
//     //     `**${data.channel.name}** just uploaded a new video - **${data.video.link}**`
//     // );
// });

// notifier.subscribe('UCiVty0vnYbswLGhmWTp6FPA');

// //routes
app.use('/', web)
app.use("/api", api);
// // console.log('************************\n', process.env, '\n************************');

// getUserbot = function() {
//     return new Promise((resolve, reject) => {
//         fetch('https://discord.com/api/v9/users/@me', {
//             headers: {
//                 Authorization: 'Bot '+process.env.TOKEN_DISCORD
//             }
//         }).then(r=>r.json()).then(r=> {
//             global.userbot = r
//             resolve(r)
//         })
//     })
// }
