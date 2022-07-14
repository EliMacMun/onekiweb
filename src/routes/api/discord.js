// @ts-check
import { Router } from 'express'
const router = Router()
import cors from '../../cors.js'

router.get('/user/:id', cors, async (req, res) => {
    fetch(`https://discord.com/api/users/${req.params.id}`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => res.status(500).send(err))
})

export default router
