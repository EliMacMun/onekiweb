const {Router} = require("express");
const router = Router();

module.exports = router;

router.get('/bot', (req, res) => {
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bot ${process.env.TOKEN_DISCORD}`,
        },
    }).then(r=>r.json()).then(u=>res.json(u));
})

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
        // noinspection JSValidateTypes
        if (!cmd.find(c=>c.name===command||c.alias.includes(command))) res.status(500).send('command not found');
        else res.json(cmd.find(c=>c.name===command||c.alias.includes(command)))
    } else res.json(cmd);
});