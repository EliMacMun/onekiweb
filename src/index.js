// noinspection NodeCoreCodingAssistance,JSCheckFunctionSignatures

const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const morgan = require("morgan");
const passport = require("./passport");
const session = require("express-session");
const flash = require("connect-flash");
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(require("../firebase-key.json")),
    databaseURL: 'https://neoarmy-18011.firebaseio.com'
});
global.fetch = require('node-fetch')
global.db = admin.firestore();

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(require('express-ejs-layouts'))
app.set('layout', './layouts/index')

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.static(path.join(__dirname, "public")));
const server = app.listen(app.get("port"), () => {
    console.log(`listen on port ${app.get("port")}`);
});
app.use(flash());
app.use(
    session({
        secret: "loggindiscord",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

//socket
//const { Server } = require('ws');
//const wss = new Server({ server });
//wss.on('connection', (ws) => {
    //ws.send('conectado al websoket de oneki')
    //console.log('Client connected');
    //ws.on('message', (msg) => {
        //wss.clients.forEach((client) => {
            //console.log(client);
            //wss.clients.forEach((c) => {
                //c.send(msg);
              //});
            //// client.send(msg);
        //});
    //})
    //ws.on('close', () => console.log('Client disconnected'));
//});
const socketIO = require('socket.io')
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.onAny((event, ...args) => {
        console.log(event, args);
        io.emit(event, args);
      });
    socket.on('disconnect', () => console.log('Client disconnected'));
});


//routes
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));
console.log('************************\n', process.env, '\n************************');
