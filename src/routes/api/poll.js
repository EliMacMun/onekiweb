import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/:id', (req, res) => {
    const snap = await db.collection('polls').doc(req.params.id).get()
    if (!snap.exists) res.status(404).send('Not found')
    else res.status(200).json(snap.data())
})

export default router
