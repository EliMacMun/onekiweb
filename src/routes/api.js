const { Router } = require('express');
const fetch = require('node-fetch');
const router = Router();

module.exports = router;

router.get('/bot/user', async (req, res) => {
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bot ${process.env.TOKEN_DISCORD}`,
        },
});

router.get('/:lang/cmd/:category', (req, res) => {
