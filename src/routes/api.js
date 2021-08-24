const { Router } = require('express');
const fetch = require('node-fetch');
const router = Router();
let FieldValue = require("firebase-admin").firestore.FieldValue;
const db = require("firebase-admin").database();

module.exports = router;

router.get('/user', async (req, res) => {
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bot ${process.env.TOKEN_DISCORD}`,
        },
    }).then(r=>r.json()).then(u=>res.json(u));
});

router.get('/:lang/cmd/:category', (req, res) => {
    const { lang, category } = req.params;
    let cmd;
    try {
        cmd = require(`../lang/${lang}/cmd.json`);
    } catch (error) {
        // console.log(`${error}`);
        cmd = require(`../lang/en/cmd.json`);
        // res.sendStatus(500).send('XD')
    }
    // 
    if (category=='categories') res.json(cmd.map(c=>c.category).filter((e,i,a)=>a.indexOf(e)==i));
    else if (category=='all') res.json(cmd);
    else if (!cmd.filter(c=>c.category==category)) res.sendStatus(500).send('Category not found')
    else res.json(cmd.filter(c=>c.category==category));
});

router.get('/:lang/cmd/', (req, res) => {
    const { lang } = req.params;
    const { command } = req.query;
    let cmd;
    try {
        cmd = require(`../lang/${lang}/cmd.json`);
    } catch (error) {
        cmd = require(`../lang/en/cmd.json`);
    }
    if (command) {
        if (!cmd.find(c=>c.name==command||c.alias.includes(command))) res.status(500).send('command not found');
        else res.json(cmd.find(c=>c.name==command||c.alias.includes(command)))
    } else res.json(cmd);
});

router.get("/fakeDiscordMessage", async (req, res) => {
    console.log(req.query);
    let text = (req.query.text ?? "");
    if (req.query.mentions) {
        const mentions = JSON.parse(req.query.mentions)
        for (const match of text.match(/<@!?\d{17,19}>/g)??[]) {
            text = text.replace(match, `<span class="mention wrapper-3WhCwL mention interactive" aria-controls="popout_1112" aria-expanded="false" tabindex="0" role="button">@${mentions[match.match(/\d{17,19}/g)[0]]}</span>`);
            console.log(match, match.match(/\d{17,19}/g)[0], mentions[match.match(/\d{17,19}/g)[0]], text);
        }
    }
    res.render('fakeDiscordMessage', {
        layout: false,
        UserColor: req.query.color ? `#${req.query.color}` : "#b9bbbe",
        AvatarUrl: req.query.avatar ?? "https://preview.redd.it/nx4jf8ry1fy51.gif?format=png8&s=a5d51e9aa6b4776ca94ebe30c9bb7a5aaaa265a6",
        UserName: req.query.user ?? "user",
        Text: text.replace(/</gi,'&#60;').replace(/>/gi,'&#62;'),
        Bot: req.query.bot == '1',
        Verified: req.query.verified == '1' && req.query.bot == '1',
        Time: `hoy a las ${format24(new Date().getHours())}:${format24(new Date().getMinutes())}`
    });
    // ` `
});

router.post("/ban", async (req, res) => {
    try {
        const user = req.body.user;
        const server = req.body.server;
        let razon = req.body.razon;
        if (!user) {
            res.json({
                error: "user no especificado",
            });
        } else if (!server) {
            res.json({
                error: "server no especificado",
            });
        } else if (!/^\d{18}$/g.test(user)) {
            res.json({
                error: "user debe ser un ID",
            });
        } else if (!/^\d{18}$/g.test(server)) {
            res.json({
                error: "server debe ser un ID",
            });
        } else {
            if (!razon) razon = "Sin razón especificada";
            let ban = {};
            ban[`${server}`] = razon;
            bd.doc(`usersApi/${user}/ban/servidores`)
                .update(ban)
                .then((result) => {
                    result.ok = true;
                    res.send(result);
                })
                .catch((err) => {
                    if (err.details.startsWith("No document to update")) {
                        bd.doc(`usersApi/${user}/ban/servidores`).set(ban).then((result) => {

                            result.ok = true;
                            res.send(result);
                        }).catch((erro) => {
                            res.send(erro)
                        })
                    } else {
                        res.send(err)
                    }
                });
        }
    } catch (error) {
        console.log(error);
        res.json({
            error: "internal server error",
        });
    }
});

router.get("/user/:ID/ban", async (req, res) => {
    try {
        const user = req.params.ID;
        if (!user) {
            res.json({
                error: "user no especificado",
            });
        } else if (!/^\d{18}$/g.test(user)) {
            res.json({
                error: "user debe ser un ID",
            });
        } else {
            const userData = await bd.doc(`usersApi/${user}/ban/servidores`).get()
            if (userData.exists) {
                const bans = [];
                for (const server in userData.data()) {
                    bans.push(userData.data()[server])
                }
                res.json({
                    isBanned: true,
                    bans: bans,
                    bansCount: bans.length
                });
            } else {
                res.json({
                    isBanned: false
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({
            error: "internal server error",
        });
    }
});

router.post("/unban", async (req, res) => {
    try {
        const user = req.body.user;
        const server = req.body.server;
        if (!user) {
            res.json({
                error: "user no especificado",
            });
        } else if (!server) {
            res.json({
                error: "server no especificado",
            });
        } else {
            let ban = {};
            ban[`${server}`] = FieldValue.delete();
            bd.doc(`usersApi/${user}/ban/servidores`)
                .update(ban)
                .then((result) => {
                    result.ok = true;
                    res.send(result);
                });
            // }
        }
    } catch (error) {
        console.log(error);
        res.json({
            error: "internal server error",
        });
    }
});

router.post("/mute", async (req, res) => {
    try {
        const user = req.body.user;
        const server = req.body.server;
        let razon = req.body.razon;
        if (!user) {
            res.json({
                error: "user no especificado",
            });
        } else if (!server) {
            res.json({
                error: "server no especificado",
            });
        } else {
            if (!razon) razon = "Sin razón especificada";
            let mute = {
                razones: FieldValue.arrayUnion(razon),
                count: FieldValue.increment(1),
            };
            bd.doc(`usersAPI/${user}/mute/${server}`)
                .update(mute)
                .then((result) => {
                    result.ok = true;
                    res.send(result);
                });
        }
    } catch (error) {
        console.log(error);
        res.json({
            error: "internal server error",
        });
    }
});

router.post("/kick", async (req, res) => {
    try {
        const user = req.body.user;
        const server = req.body.server;
        let razon = req.body.razon;
        if (!user) {
            res.json({
                error: "user no especificado",
            });
        } else if (!server) {
            res.json({
                error: "server no especificado",
            });
        } else if (!razon) {
            res.json({
                error: "razon no especificado",
            });
        } else {
            if (!razon) razon = "Sin razón especificada";
            let kick = {
                razones: FieldValue.arrayUnion(razon),
                count: FieldValue.increment(1),
            };
            bd.doc(`usersApi/${user}/kick/${server}`)
                .update(kick)
                .then((result) => {
                    result.ok = true;
                    res.send(result);
                });
        }
    } catch (error) {
        console.log(error);
        res.json({
            error: "internal server error",
        });
    }
});

router.get("/userbans", async (req, res) => {
    res.redirect("/");
});

router.get("/userbancount", async (req, res) => {
    res.redirect("/");
});

router.get("/serverban", async (req, res) => {
    res.redirect("/");
});

function format24(params) {
    let s = params.toString()
    if (s.length == 1) {
        return `0${s}`;
    } else {
        return params;
    }
}