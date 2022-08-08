// @ts-check
import notifier from './youtube.js'
import serverApp from './app.js'
import db from './db.js'

//routes
import('./routes/web.js').then(web => serverApp.app.use('/', web.default))

import('./routes/api.js').then(api => serverApp.app.use('/api', api.default))

// youtube
const snap = await db.collection('notifications').doc('youtube').get()
if (snap.exists) for (const key in snap.data()) notifier.subscribe(key)
