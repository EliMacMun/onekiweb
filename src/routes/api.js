const { Router } = require('express');
const fetch = require('node-fetch');
const router = Router();

module.exports = router;

router.get('/bot/user', async (req, res) => {
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bot ${process.env.TOKEN_DISCORD}`,
        },
    }).then(r=>r.json()).then(u=>res.json(u));
});

router.get('/:lang/cmd/:category', (req, res) => {
    const { lang, category } = req.params;
    const cmd = require(`../lang/${lang}/cmd.json`)
    console.log(cmd.map(c=>c.category).filter((e,i,a)=>a.indexOf(e)==i));
    if (category=='categories') res.json(cmd.map(c=>c.category).filter((e,i,a)=>a.indexOf(e)==i));
    else if (category=='all') res.json(cmd);
    else if (!cmd) res.status(404).send('language not found');
    else if (!cmd.filter(c=>c.category==category)) res.status(404).send('category not found');
    else res.json(cmd.filter(c=>c.category==category));
});

router.get('/:lang/cmd/', (req, res) => {
    const { lang } = req.params;
    const { command } = req.query;
    const cmd = require(`../lang/${lang}/cmd.json`)
    if (!cmd) res.status(404).send('language not found');
    else if (command) {
        if (!cmd.find(c=>c.name==command||c.alias.includes(command))) res.status(404).send('command not found');
        else res.json(cmd.find(c=>c.name==command||c.alias.includes(command)))
    } else res.json(cmd);
});