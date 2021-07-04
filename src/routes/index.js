const { Router } = require('express');
const router = Router();

router.get('/', async (req, res, next) => {
    res.send('En construccion, disculpe las molestias')
});

module.exports = router;