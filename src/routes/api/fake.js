import { Router } from "express"

const router = Router()

router.get("/discord/message", (req, res) => {
    res.render('fake/discord/message', {
        layout: false
    })
})

router.get("/", (req, res) => {
    console.log('ss');
})

export { router as fake }