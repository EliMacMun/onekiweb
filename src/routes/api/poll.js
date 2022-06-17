import { Router } from 'express'
const router = Router()

router.get('/:id', (req, res) => {
    res.render('poll', {
        user: req.user
    })
})

export default router
