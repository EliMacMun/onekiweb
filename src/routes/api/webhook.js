import { Router } from 'express'
const router = Router()

router.post('/heroku', (req, res) => {
    const {
        action,
        actor,
        created_at,
        id,
        data: { release, app, state, command }
    } = req.body
    console.log(req.body)
    fetch(
        'https://canary.discord.com/api/webhooks/891458927479377930/ZiTKdJkpIuyd1x3E3IDVMn1ecd7aHGsd-lPb89P-KDJ5RoafxLGUKc6ReptDB3iCuRhS',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: '```'+JSON.stringify(req.body, null, 2)+'```'
            })
        }
    )
    // fetch(
    //     'https://canary.discord.com/api/webhooks/891458927479377930/ZiTKdJkpIuyd1x3E3IDVMn1ecd7aHGsd-lPb89P-KDJ5RoafxLGUKc6ReptDB3iCuRhS',
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             username: 'Heroku',
    //             avatar_url: 'https://icon-library.com/images/heroku-icon/heroku-icon-24.jpg',
    //             embeds: [
    //                 {
    //                     title: `${action} ${app.name} [v${release.version}]`,
    //                     url: `https://dashboard.heroku.com/apps/${app.name}/activity/builds/${id}`,
    //                     author: {
    //                         name: actor.email,
    //                         icon_url: 'https://icon-library.com/images/heroku-icon/heroku-icon-24.jpg',
    //                         url: `https://dashboard.heroku.com/apps/${app.name}`
    //                     },
    //                     fields: [
    //                         {
    //                             name: 'Time',
    //                             value: `<t:${new Date(created_at).getTime() / 100}>`,
    //                             inline: true
    //                         },
    //                         {
    //                             name: 'State',
    //                             value: `\`\`\`\n${state}\n\`\`\``,
    //                             inline: true
    //                         },
    //                         {
    //                             name: 'Execute',
    //                             value: `\`\`\`\n${command}\n\`\`\``,
    //                             inline: true
    //                         }
    //                     ]
    //                 }
    //             ]
    //         })
    //     }
    // )

    res.json({
        status: '200 ok'
    })
})

export { router as webhook }