'use strict';
const { Router } = require('express');
const router = Router();

router.post('/heroku', (req, res) => {
    console.log(req.body)
    fetch('https://canary.discord.com/api/webhooks/891458927479377930/ZiTKdJkpIuyd1x3E3IDVMn1ecd7aHGsd-lPb89P-KDJ5RoafxLGUKc6ReptDB3iCuRhS', {
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