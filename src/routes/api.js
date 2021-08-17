const { Router } = require('express');
const fetch = require('node-fetch');
const router = Router();

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
    res.render('fakeDiscordMessage', {
        layout: false,
        UserColor: req.query.color ? `#${req.query.color}` : "#b9bbbe",
        AvatarUrl: req.query.avatar ?? "https://preview.redd.it/nx4jf8ry1fy51.gif?format=png8&s=a5d51e9aa6b4776ca94ebe30c9bb7a5aaaa265a6",
        UserName: req.query.user ?? "user",
        Text: req.query.text ?? "",
        Bot: req.query.bot == '1',
        Verified: req.query.verified == '1' && req.query.bot == '1',
        Time: `hoy a las ${format24(new Date().getHours())}:${format24(new Date().getMinutes())}`
    });
});

