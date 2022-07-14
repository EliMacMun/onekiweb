// noinspection JSUnresolvedVariable

import notifications from './api/notifications.js'
import moderation from './api/moderation.js'
import webhook from './api/webhook.js'
import server from './api/server.js'
import poll from './api/poll.js'
import fake from './api/fake.js'
import { Router } from 'express'

const router = Router()

// POLL
router.use('/poll', poll)

// WEBHOOK
router.use('/webhook', webhook)

// notifications
router.use('/notifications', notifications)

// moderation
router.use('/moderation', moderation)

// fake
router.use('/fake', fake)

router.use('/server', server)

export default router
