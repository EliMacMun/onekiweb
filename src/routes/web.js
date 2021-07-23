const { Router } = require('express');
const router = Router();

const bot = require('../bot');

router.get('/', async (req, res, next) => {
    res.render('index', {
        title: 'Oneki Bot',
        bot: bot.user??bot.usuario
    });
});

module.exports = router;