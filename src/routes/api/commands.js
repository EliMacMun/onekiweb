import { Router } from 'express'
import cmd from '../../commands/en.json' assert { type: 'json' }

const router = Router()

router.get('/', (req, res) => {
    const { category, name } = req.query
    
    if (!category) res.json(cmd)
    else if (name) res.json(cmd.find(c => c.name === name)??[]) 
    else res.json(cmd[category])
})

router.get('/categories', (req, res) => {
    res.json(cmd.map(c=>c.category).filter((e, i, a)=>a.indexOf(e)===i))
})