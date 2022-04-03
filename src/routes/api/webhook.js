import { Router } from 'express'
const router = Router()

router.post('/heroku', (req, res) => {
    const { action, actor, created_at, id, data, version } = req.body
    fetch(
        'https://canary.discord.com/api/webhooks/891458927479377930/ZiTKdJkpIuyd1x3E3IDVMn1ecd7aHGsd-lPb89P-KDJ5RoafxLGUKc6ReptDB3iCuRhS',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'Heroku',
                avatar_url: 'https://icon-library.com/images/heroku-icon/heroku-icon-24.jpg',
                embeds: [
                    {
                        title: `${action} ${app.name} [v${version}]`,
                        url: `https://dashboard.heroku.com/apps/${data.name}/activity/builds/${id}`,
                        author: {
                            name: actor.email,
                            icon_url: 'https://icon-library.com/images/heroku-icon/heroku-icon-24.jpg',
                            url: `https://dashboard.heroku.com/apps/${data.name}`
                        },
                        fields: [
                            {
                                name: 'Time',
                                value: `<t:${new Date(created_at).getTime() / 100}>`,
                                inline: true
                            },
                            // {
                            //     name: 'State',
                            //     value: `\`\`\`\n${state}\n\`\`\``,
                            //     inline: true
                            // },
                            // {
                            //     name: 'Execute',
                            //     value: `\`\`\`\n${command}\n\`\`\``,
                            //     inline: true
                            // }
                        ]
                    }
                ]
            })
        }
    )

    res.status(204).send()
})

export { router as webhook }