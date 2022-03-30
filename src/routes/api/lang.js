import { Router } from 'express'
const router = Router()

router.get('/:lang/cmd/:category', (req, res) => {
    const { lang, category } = req.params;
    let cmd;
    try {
        cmd = require(`../../lang/${lang}/cmd.json`);
    } catch (error) {
        cmd = require('../../lang/en/cmd.json');
    }
    // console.log(cmd)
    if (category==='categories') res.json(cmd.map(c=>c.category).filter((e, i, a)=>a.indexOf(e)===i));
    else if (category==='all') res.json(cmd);
    else if (!cmd.filter(c=>c.category===category)) res.status(500).json({
        error: 'Category not found'
    })
    else res.json(cmd.filter(c=>c.category===category));
});

router.get('/:lang/cmd/', (req, res) => {
    const { lang } = req.params;
    const { command } = req.query;
    let cmd;
    try {
        cmd = require(`../../lang/${lang}/cmd.json`);
    } catch (error) {
        cmd = require(`../../lang/en/cmd.json`);
    }
    if (command) {
        // noinspection JSValidateTypes
        if (!cmd.find(c=>c.name===command||c.alias.includes(command))) res.status(500).json({
            error: 'Command not found'
        });
        else res.json(cmd.find(c=>c.name===command||c.alias.includes(command)))
    } else res.json(cmd);
});

export { router as lang }