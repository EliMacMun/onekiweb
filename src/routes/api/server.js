// @ts-check
import { Router } from 'express'
const router = Router()
import db from '../../db.js'

router.get('/:id', async (req, res) => {
    const snap = await db.collection('guilds').doc(req.params.id).get()
    if (!snap.exists) res.status(404).send('Server not found')
    else res.status(200).json(snap.data())
})

router.get('/:id/polls', async (req, res) => {
    const snap = await db.collection('polls').where('guild', '==', req.params.id).get()
    if (snap.empty) res.status(200).json([])
    else res.status(200).json(snap.docs.map(d => d.data()))
})

export default router
