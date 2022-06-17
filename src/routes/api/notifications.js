import notifier from '../../youtube.js'
import { Router } from 'express'

const router = Router()

router.use('/youtube', notifier.listener())

export default router
