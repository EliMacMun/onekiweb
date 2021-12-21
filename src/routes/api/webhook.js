'use strict';
const { Router } = require('express');
const {WebhookClient, MessageEmbed} = require("discord.js");
const router = Router();

router.post('/heroku', (req, res) => {
    const {action, actor, created_at, id, data:{release, app, state, command}} = req.body
    (new WebhookClient({ url: 'https://canary.discord.com/api/webhooks/891458927479377930/ZiTKdJkpIuyd1x3E3IDVMn1ecd7aHGsd-lPb89P-KDJ5RoafxLGUKc6ReptDB3iCuRhS'})).send({
        embeds: [
            new MessageEmbed()
                .setURL(`https://dashboard.heroku.com/apps/${app.name}/activity/builds/${id}`)
                .setTitle(`${action} ${app.name} [v${release.version}]`)
                .setAuthor(actor.email, 'https://icon-library.com/icon/heroku-icon-24.html.html', `https://dashboard.heroku.com/apps/${app.name}`)
                .addField('Time', `<t:${new Date(created_at).getTime()/100}>`)
                .addField('State', `\`\`\`\n${state}\n\`\`\``)
                .addField('Execute', `\`\`\`\n${command}\n\`\`\``)
        ]
    })
    res.json({
        status: "200 ok"
    })
});

module.exports = router;