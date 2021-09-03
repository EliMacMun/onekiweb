'use strict';
const { Router } = require('express');
const router = Router();

router.post('/heroku', (req, res) => {
    console.log(req.body)
    res.json({
        status: "200 ok"
    })
});

module.exports = router;