import { Router } from 'express'

const router = Router()

router.get('/discord/message', (req, res) => {
    const { 
        username = 'Oneki', 
        avatar = 'https://cdn.discordapp.com/avatars/901956486064922624/e7d4737319365eed6d83bd29606e5872.png?size=80', 
        bot, 
        verified, 
        message = 'Hey, who are you?',
        color = 'rgb(98, 164, 199)'
    } = req.query
    res.render('fake/discord/message', {
        layout: false,
        username,
        avatar,
        message,
        color: processColor(color),
        bot: Object.values(req.query).length > 0 ? isBotVerified(bot, verified) : isBotVerified(true, true),
    })
})

function isBotVerified(bot, verified) {
    if (typeof bot === 'undefined') return ''
    if (typeof verified === 'undefined')
        return '<span class="botTagCozy-3NTBvK botTag-1NoD0B botTagRegular-kpctgU botTag-7aX5WZ rem-3kT9wc"><span class="botText-1fD6Qk">BOT</span></span>'
    return '<span class="botTagCozy-3NTBvK botTag-1NoD0B botTagRegular-kpctgU botTag-7aX5WZ rem-3kT9wc"><svg aria-label="Bot verificado" class="botTagVerified-2KCPMa" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg><span class="botText-1fD6Qk">BOT</span></span>'
}

/**
 * 
 * @param {string} color 
 */
function processColor(color) {
    if ((/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/i)) return color
    else return 'rgb(98, 164, 199)'
}

export { router as fake }
