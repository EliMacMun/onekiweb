const { Router } = require('express');
const fetch = require('node-fetch');
const router = Router();

module.exports = router;

router.get('/', async (req, res) => {
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bot ${process.env.TOKEN_DISCORD}`,
        },
    }).then(r=>r.json()).then(u=>res.json(u))
    // const user = (await ).json();
    // res.json(user);;
})