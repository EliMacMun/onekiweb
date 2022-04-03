import { Router } from 'express'
const router = Router()

router.post('/heroku/release', (req, res) => {
    const { webhook_metadata, action, actor, created_at, id, data, version } = req.body
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
                        title: `${webhook_metadata.event.include} ${action} ${data.app.name}`,
                        url: `https://dashboard.heroku.com/apps/${data.app.name}/activity/builds/${id}`,
                        author: {
                            name: actor.email,
                            icon_url: 'https://icon-library.com/images/heroku-icon/heroku-icon-24.jpg',
                            url: `https://dashboard.heroku.com/apps/${data.app.name}`
                        },
                        description: data.description,
                        fields: [
                            {
                                name: 'Execute',
                                value: `\`\`\`\n${data.pstable.web.command}\n\`\`\``,
                                inline: true
                            },
                            {
                                name: 'Status',
                                value: `\`\`\`\n${data.status}\n\`\`\``,
                                inline: true
                            },
                            {
                                name: 'Version',
                                value: `\`\`\`\n${version}\n\`\`\``,
                                inline: true
                            },
                            {
                                name: 'Commit',
                                value: `\`\`\`\n[${data.slug.commit}]\n${data.slug.commit_description}\n\`\`\``,
                                inline: true
                            },
                        ],
                        timestamp: new Date(created_at),
                        footer: {
                            text: `${actor.email}`,
                            icon_url: 'https://icon-library.com/images/heroku-icon/heroku-icon-24.jpg'
                        }
                    }
                ]
            })
        }
    )

    res.status(204).send()
})

export { router as webhook }