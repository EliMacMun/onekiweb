'use strict';
const { Router } = require('express');
const router = Router();

router.post('/', (req, res) => {
    console.log(req.body)
    res.json({
        pollId: req.body.id
    })
});

module.exports = router;