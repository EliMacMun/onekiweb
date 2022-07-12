// @ts-check
import { Router } from 'express'
const router = Router()
import db from '../../db.js'

router.get('/:id', async (req, res) => {
    const snap = await db.collection('polls').doc(req.params.id).get()
    if (!snap.exists) res.status(404).send('Poll Not found')
    else res.status(200).json(snap.data())
})

router.get('/:id/optons', async (req, res) => {
    const snap = await db.collection('polls').doc(req.params.id).get()
    if (!snap.exists) res.status(404).send('Poll not found')
    else res.status(200).json(snap.data()?.optons ?? [])
})

router.post('/:id/votes', async (req, res) => {
    const { id, user } = req.body
    if (!id || !user) return res.status(500).send('Invalid body')
    const ref = db.collection('polls').doc(req.params.id)
    const snap = await ref.get()
    if (!snap.exists) return res.status(404).send('Poll not found')
    // TODO: check if user has already voted
    const data = snap.data()?.optons
    data.options = data.options.map(o => {
        if (!data.multiple_choices && o.votes.includes(user)) o.votes = o.votes.filter(v => v !== user)
        if (o.id === id) o.votes.push(user)
        return o
    })
    ref.update({
        options: data.options
    })
    res.status(200).json(data.options)
})
export default router
