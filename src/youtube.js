import YouTubeNotifier from 'youtube-notification'
import db from './db.js'
import socket from './socket.js'

export default new YouTubeNotifier(
    {
        hubCallback: 'http://localhost:3000/api/notifications/youtube',
        // hubCallback: 'https://oneki.up.railway.app/api/notifications/youtube/',
        secret: 'otherSecret'
    },
    (console.log('x'), true)
)
    .on('notified', async data => {
        console.log(data)

        const snap = await db.collection('notifications').doc('youtube').get()
        if (!snap.exists) return

        snap.data()?.[data.channel.id]?.map(id => {
            socket.clients.forEach(client => {
                client.send(
                    JSON.stringify({
                        event: 'new_yt_video',
                        from: 'mweb',
                        data: {
                            server: id,
                            data
                        }
                    })
                )
            })
        })
    })
    .on('subscribe', data => {
        console.log('Subscribed')
        console.log(data)
    })
    .on('unsubscribe', data => {
        console.log('Unsubscribed')
        console.log(data)
    })
    .on('denied', data => {
        console.log('Denied')
        console.log(data)
    })
