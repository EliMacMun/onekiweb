import { Router } from 'express'
const router = Router();

router.post('/', (req, res) => {
    const { id, options, message, channel, guild } = req.body;
    if(!id) return res.status(500).send({
        error: 'params not found',
        message: 'param "id" required',
        status: 500
    })
    if(!options) return res.status(500).send({
        error: 'params not found',
        message: 'param "options" required',
        status: 500
    })
    let obj = {
        message,
        channel,
        guild,
        options: []
    }
    for (const {name, value} of options) obj.options.push({
        name,
        value,
        votes: []
    })
    db.collection('poll').doc(req.body.id).set(obj).then(() => res.json({
        pollId: req.body.id
    })).catch(error => {
        console.log(error)
        res.status(500).send({
            error: `${error}`
        })
    });
});

export { router as poll }