'use strict';
const { Router } = require('express');
const router = Router();

router.post('/heroku', (req, res) => {
    console.log(req.body)
            fetch('https://canary.discord.com/api/webhooks/883159152183091202/dIMlDJXworBoB6SukT0vngRYrQC8v0iDgLjBStXoBSPoTd9EfqQM9SBGVevaSm3ke0uP', {
                method: 'POST',
                body: JSON.stringify({
                    content: `\`\`\`json\n${JSON.stringify(req.body, null, 4)}\n\`\`\``,
                    username: 'Heroku',
                    avatar_url: "https://brandeps.com/logo-download/H/Heroku-logo-vector-01.svg"
                })
            })
    res.json({
        status: "200 ok"
    })
});

module.exports = router;