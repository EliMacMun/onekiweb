// noinspection JSUnresolvedVariable

import { Router } from 'express'
import { poll } from './api/poll.js'
import { webhook } from './api/webhook.js'
import { discord } from './api/discord.js'
import { lang } from './api/lang.js'
import { notifications } from './api/notifications.js'
import { moderation } from './api/moderation.js'
import { commands } from './api/commands.js'    
const router = Router()

// COMMANDS
router.use('/commands', commands)

// POLL
router.use('/poll', poll)

// WEBHOOK
router.use('/webhook', webhook)

// discord
router.use('/discord', discord)

// lang
router.use('/lang', lang)

// notifications
router.use('/notifications', notifications)

// moderation
router.use('/moderation', moderation)

// fakeDiscordMessage
router.get('/fakeDiscordMessage', async (req, res) => {
    // console.log(req.query);
    let text = req.query.text ?? ''
    if (req.query.mentions)
        for (const match of text.match(/&#60;@!?\d{17,19}&#62;/g) ?? [])
            text = text.replace(match, userMention(JSON.parse(req.query.mentions)[match.match(/\d{17,19}/g)[0]]))
    if (req.query.roles)
        for (const match of text.match(/&#60;@&\d{17,19}&#62;/g) ?? [])
            text = text.replace(match, rolesMention(JSON.parse(req.query.roles)[match.match(/\d{17,19}/g)[0]]))
    res.render('fakeDiscordMessage', {
        layout: false,
        UserColor: req.query.color ? `#${req.query.color}` : '#b9bbbe',
        AvatarUrl: req.query.avatar ?? `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`,
        UserName: req.query.user ?? 'user',
        Text: text,
        Bot: req.query.bot === '1',
        Verified: req.query.verified === '1' && req.query.bot === '1',
        Time: `hoy a las ${format24(new Date().getHours())}:${format24(new Date().getMinutes())}`
    })
})

/**
 * cambia a formato de 24 horas
 * @param hour
 */
function format24(hour) {
    const s = hour.toString()
    if (s.length === 1) {
        return `0${s}`
    } else {
        return hour
    }
}

/**
 * crea un tag de usuario
 * @param user: string
 */
function userMention(user) {
    return `<span class="mention wrapper-3WhCwL mention interactive">@${user}</span>`
}

function rolesMention(role) {
    return `<span class="roleMention-2Bj0ju desaturate-qhyunI wrapper-3WhCwL mention">@${role}</span>`
}

export { router as api }
