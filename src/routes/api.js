// noinspection JSUnresolvedVariable

import { Router } from 'express'
import poll from './api/poll.js'
import webhook from './api/webhook.js'
import notifications from './api/notifications.js'
import moderation from './api/moderation.js'
import fake from './api/fake.js'

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

export default router
