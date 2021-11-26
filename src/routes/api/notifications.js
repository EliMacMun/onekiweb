const {Router} = require("express");
const router = Router();

module.exports = router;

router.use('/youtube', notifier.listener())
// router.get('/youtube/test', (req, res) => {
//     console.log('get')
//     console.log('body', req.body);
//     console.log('params', req.params);
//     console.log('query', req.query);
//     res.status(200).json({
//         status: 'ok',
//         code: 200
//     })
// })
//
// router.post('/youtube/test', (req, res) => {
//     console.log('post')
//     console.log('body', req.body);
//     console.log('params', req.params);
//     console.log('query', req.query);
//     res.status(200).json({
//         status: 'ok',
//         code: 200
//     })
// })