import { Router } from 'express'
const router = Router()

router.use('/youtube', notifier.listener())

export { router as notifications }