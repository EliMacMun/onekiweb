// @ts-check
import notifier from './youtube.js'
import serverApp from './app.js'

// youtube
notifier.subscribe('UCiVty0vnYbswLGhmWTp6FPA')

//routes
import('./routes/web.js').then(web => {
    serverApp.app.use('/', web.default)
})

import('./routes/api.js').then(api => {
    serverApp.app.use('/api', api.default)
})
