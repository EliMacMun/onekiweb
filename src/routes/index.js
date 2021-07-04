const { Router } = require('express');
const router = Router();

router.get('/', async (req, res, next) => {
    res.render('index', {
        title: 'Oneki Bot',
        bot: {
            username: 'Oneki',
            avatar: 'https://cdn.discordapp.com/avatars/858903483004354560/4137e61af297c696d98321f56bc8abc2.png?size=64'
        }
    });
});

module.exports = router;