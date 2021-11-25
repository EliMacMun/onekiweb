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
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=901956486064922624&permissions=8&redirect_uri=https%3A%2F%2Foneki.herokuapp.com%2Flogin&response_type=code&scope=bot%20identify%20guilds%20applications.commands');
});

router.get('/thanks', (req, res) => {
    if(!req.user) res.redirect('/login')
    else res.redirect('/')
})

router.get('/discord', (req, res) => {
    res.redirect('https://discord.gg/8SpUxnF6v4')
})

module.exports = router;
