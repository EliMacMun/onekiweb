const {Router} = require("express");
const router = Router();

module.exports = router;

router.get('/:lang/cmd/:category', (req, res) => {
    const { lang, category } = req.params;
    let cmd;
    try {
        cmd = require(`../lang/${lang}/cmd.json`);
    } catch (error) {
        cmd = require(`../lang/en/cmd.json`);
    }
    if (category==='categories') res.json(cmd.map(c=>c.category).filter((e, i, a)=>a.indexOf(e)===i));
    else if (category==='all') res.json(cmd);
    else if (!cmd.filter(c=>c.category===category)) res.sendStatus(500).send('Category not found')
    else res.json(cmd.filter(c=>c.category===category));
})