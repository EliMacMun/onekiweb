// @ts-check
import YouTubeNotifier from 'youtube-notification'
import db from './db.js'
import socket from './socket.js'

export default new YouTubeNotifier({
    hubCallback: 'https://oneki.up.railway.app/api/notifications/youtube/',
    secret: 'IDK'
}).on('notified', async data => {
    const snap = await db.collection('notifications').doc('youtube').get()
    if (!snap.exists) return

    snap.data()?.[data.channel.id]?.map(id => {
        socket.clients.forEach(client => {
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
