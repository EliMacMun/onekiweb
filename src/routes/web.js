const { Router } = require('express');
const router = Router();
const passport = require("../passport");
// const auth = require("../auth");

router.get('/', async (req, res) => {
    if(!userbot) await getUserbot();
    console.log(userbot)
    res.render('index', {
        title: 'Oneki Bot',
        active: 'inicio',
        userbot,
        user: req.user
    });
});

router.get('/commands', async (req, res) => {
    if(!userbot) await getUserbot();
    res.render('commands', {
        title: 'Oneki Bot',
        active: 'inicio',
        userbot,
        user: req.user
    });
});

router.get('/login', passport.authenticate("discord", { failureRedirect: "/" }), async (req, res) => {
    res.redirect(req.flash('redi')[0]??"/");
});

router.get('/invite', (req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=858903483004354560&permissions=8&scope=bot%20applications.commands');
});

module.exports = router;