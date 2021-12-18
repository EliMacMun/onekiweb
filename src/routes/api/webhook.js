'use strict';
const { Router } = require('express');
const {WebhookClient} = require("discord.js");
const router = Router();

router.post('/heroku', (req, res) => {
    (new WebhookClient({ url: 'https://canary.discord.com/api/webhooks/891458927479377930/ZiTKdJkpIuyd1x3E3IDVMn1ecd7aHGsd-lPb89P-KDJ5RoafxLGUKc6ReptDB3iCuRhS'})).send({
        content: `\`\`\`json\n${JSON.stringify(req.body, null, 4)}\n\`\`\``
    })
    res.json({
        status: "200 ok"
    })
});

module.exports = router;