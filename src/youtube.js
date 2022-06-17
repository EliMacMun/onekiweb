// @ts-check
import YouTubeNotifier from 'youtube-notification'
import db from './db.js'

export default new YouTubeNotifier({
    hubCallback: 'https://oneki.up.railway.app/api/notifications/youtube/',
    secret: 'IDK'
})

/**
 * @param {import('youtube-notification')} notifier
 * @param {import('ws').WebSocketServer} ws
 */
export function configYTNotifier(notifier, ws) {
    notifier.on('notified', async data => {
        const snap = await db.collection('notifications').doc('youtube').get()
        if (!snap.exists) return

        snap.data()?.[data.channel.id]?.map(id => {
            ws.clients.forEach(client => {
                client.send(
                    JSON.stringify({
                        event: 'new_yt_video',
                        server: id,
                        value: data
                    })
                )
            })
        })
    })

    notifier.subscribe('UCiVty0vnYbswLGhmWTp6FPA')

    return notifier
}
